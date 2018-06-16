import _ from 'lodash';
import querystring from 'query-string';
import { remoteURL } from 'constants/environment';
import { OK, CREATED } from 'constants/httpCodes';
import httpMethods from 'constants/httpMethods';
import { FetchError, ServerError, ServerValidationError } from '../errors/index';

const jsonFetch = async (getToken, url, method, dataOrQuery = {}) => {
  let result;
  let response;
  const headers = {};
  const token = getToken();

  if (token) {
    headers['x-access-token'] = token;
  }

  if (method !== httpMethods.get && method !== httpMethods.delete) {
    headers.Accept = 'application/json, text/plain, */*';
    headers['Content-Type'] = 'application/json';
  }

  try {
    if (method === httpMethods.get) {
      if (!_.isEmpty(dataOrQuery)) {
        response =
          await fetch(`${remoteURL}${url}?${querystring.stringify(dataOrQuery)}`, { headers });
      } else {
        response = await fetch(`${remoteURL}${url}`, { headers });
      }
    } else if (method === httpMethods.delete) {
      response = await fetch(`${remoteURL}${url}`, {
        headers,
        method,
      });
    } else {
      response = await fetch(`${remoteURL}${url}`, {
        headers,
        method,
        body: JSON.stringify(dataOrQuery),
      });
    }

    result = await response.json();
  } catch (e) {
    throw new FetchError(e.message);
  }

  // Server returned 400 or similar
  if (response.status !== (method === httpMethods.post ? CREATED : OK) && result.message) {
    if (result.fields) {
      throw new ServerValidationError(result.message, { fields: result.fields });
    }

    throw new ServerError(result.message);
  }

  return result;
};

export const getJson = _.curry(async (getToken, url, query = {}) =>
  jsonFetch(getToken, url, httpMethods.get, query));

export const postJson = _.curry(async (getToken, url, data = {}) =>
  jsonFetch(getToken, url, httpMethods.post, data));

export const putJson = _.curry(async (getToken, url, data = {}) =>
  jsonFetch(getToken, url, httpMethods.put, data));

export const patchJson = _.curry(async (getToken, url, data = {}) =>
  jsonFetch(getToken, url, httpMethods.patch, data));

export const deleteJson = _.curry(async (getToken, url) =>
  jsonFetch(getToken, url, httpMethods.delete));
