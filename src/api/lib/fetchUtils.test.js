import { remoteURL } from 'constants/environment';
import querystring from 'query-string';
import httpMethods from 'constants/httpMethods';
import { getJson, postJson, putJson, patchJson, deleteJson } from './fetchUtils';
import { FetchError, ServerError, ServerValidationError } from '../errors/index';

describe('Fetch Utils', () => {
  let jsonMock;
  const getToken = () => '1qwe';

  beforeEach(() => {
    jsonMock = jest.fn(() => Promise.resolve(1));

    window.fetch = jest.fn(() => Promise.resolve({
      json: jsonMock,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getJson()', () => {
    it('should get JSON data', async () => {
      const result = await getJson(getToken, '/api/test/');
      expect(result).toEqual(1);
      expect(window.fetch)
        .toBeCalledWith(`${remoteURL}/api/test/`, { headers: { 'x-access-token': '1qwe' } });
      expect(jsonMock).toBeCalled();
    });

    it('should get JSON data with queryString object', async () => {
      const testObj = { test_query: [1, 2, 3], a: 123 };
      const testStringify = querystring.stringify(testObj);
      const result = await getJson(getToken, '/api/test', testObj);
      expect(result).toEqual(1);
      expect(window.fetch)
        .toBeCalledWith(
          `${remoteURL}/api/test?${testStringify}`,
          { headers: { 'x-access-token': '1qwe' } },
        );
      expect(jsonMock).toBeCalled();
    });

    it('should throw a FetchError if fetch failed', async () => {
      window.fetch = jest.fn(() => Promise.reject(new Error('TST')));
      expect.assertions(1);

      try {
        await getJson(getToken, '/api/test/');
      } catch (error) {
        expect(error).toBeInstanceOf(FetchError);
      }
    });

    it('should throw a ServerError if response is not 200', async () => {
      const jsonFn = jest.fn(() => Promise.resolve({ message: 'Fail' }));
      window.fetch = jest.fn(() => Promise.resolve({
        status: 400,
        json: jsonFn,
      }));
      expect.assertions(1);

      try {
        await getJson(getToken, '/api/test/');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerError);
      }
    });
  });

  describe('postJson()', () => {
    it('should post JSON data', async () => {
      const result = await postJson(getToken, '/api/test/', { tst: 5 });
      expect(result).toEqual(1);
      expect(window.fetch).toBeCalledWith(`${remoteURL}/api/test/`, {
        method: httpMethods.post,
        body: '{"tst":5}',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'x-access-token': '1qwe',
        },
      });
      expect(jsonMock).toBeCalled();
    });

    it('should throw a FetchError if fetch failed', async () => {
      window.fetch = jest.fn(() => Promise.reject(new Error('TST')));
      expect.assertions(1);

      try {
        await postJson(getToken, '/api/test/', { tst: 5 });
      } catch (error) {
        expect(error).toBeInstanceOf(FetchError);
      }
    });

    it('should throw a ServerError if response is not 201', async () => {
      const jsonFn = jest.fn(() => Promise.resolve({ message: 'Fail' }));
      window.fetch = jest.fn(() => Promise.resolve({
        status: 400,
        json: jsonFn,
      }));
      expect.assertions(1);

      try {
        await postJson(getToken, '/api/test/', { tst: 5 });
      } catch (error) {
        expect(error).toBeInstanceOf(ServerError);
      }
    });

    it('should throw ServerValidationError if error result has fields', async () => {
      const jsonFn = jest.fn(() => Promise.resolve({ message: 'Fail', fields: { location: '1' } }));
      window.fetch = jest.fn(() => Promise.resolve({
        status: 400,
        json: jsonFn,
      }));
      expect.assertions(1);

      try {
        await postJson(getToken, '/api/test/', { tst: 5 });
      } catch (error) {
        expect(error).toBeInstanceOf(ServerValidationError);
      }
    });
  });

  describe('putJson()', () => {
    it('should post JSON data', async () => {
      const result = await putJson(getToken, '/api/test/', { tst: 6 });
      expect(result).toEqual(1);
      expect(window.fetch).toBeCalledWith(`${remoteURL}/api/test/`, {
        method: httpMethods.put,
        body: '{"tst":6}',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'x-access-token': '1qwe',
        },
      });
      expect(jsonMock).toBeCalled();
    });

    it('should throw a FetchError if fetch failed', async () => {
      window.fetch = jest.fn(() => Promise.reject(new Error('TST')));
      expect.assertions(1);

      try {
        await putJson(getToken, '/api/test/', { tst: 6 });
      } catch (error) {
        expect(error).toBeInstanceOf(FetchError);
      }
    });

    it('should throw a ServerError if response is not 200', async () => {
      const jsonFn = jest.fn(() => Promise.resolve({ message: 'Fail' }));
      window.fetch = jest.fn(() => Promise.resolve({
        status: 400,
        json: jsonFn,
      }));
      expect.assertions(1);

      try {
        await putJson(getToken, '/api/test/', { tst: 6 });
      } catch (error) {
        expect(error).toBeInstanceOf(ServerError);
      }
    });

    it('should throw ServerValidationError if error result has fields', async () => {
      const jsonFn = jest.fn(() => Promise.resolve({ message: 'Fail', fields: { location: '1' } }));
      window.fetch = jest.fn(() => Promise.resolve({
        status: 400,
        json: jsonFn,
      }));
      expect.assertions(1);

      try {
        await putJson(getToken, '/api/test/', { tst: 6 });
      } catch (error) {
        expect(error).toBeInstanceOf(ServerValidationError);
      }
    });
  });

  describe('patchJson()', () => {
    it('should patch JSON data', async () => {
      const result = await patchJson(getToken, '/api/test/', { tst: 7 });
      expect(result).toEqual(1);
      expect(window.fetch).toBeCalledWith(`${remoteURL}/api/test/`, {
        method: httpMethods.patch,
        body: '{"tst":7}',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'x-access-token': '1qwe',
        },
      });
      expect(jsonMock).toBeCalled();
    });

    it('should throw a FetchError if fetch failed', async () => {
      window.fetch = jest.fn(() => Promise.reject(new Error('TST')));
      expect.assertions(1);

      try {
        await patchJson(getToken, '/api/test/', { tst: 5 });
      } catch (error) {
        expect(error).toBeInstanceOf(FetchError);
      }
    });

    it('should throw a ServerError if response is not 200', async () => {
      const jsonFn = jest.fn(() => Promise.resolve({ message: 'Fail' }));
      window.fetch = jest.fn(() => Promise.resolve({
        status: 400,
        json: jsonFn,
      }));
      expect.assertions(1);

      try {
        await patchJson(getToken, '/api/test/', { tst: 7 });
      } catch (error) {
        expect(error).toBeInstanceOf(ServerError);
      }
    });

    it('should throw ServerValidationError if error result has fields', async () => {
      const jsonFn = jest.fn(() => Promise.resolve({ message: 'Fail', fields: { location: '1' } }));
      window.fetch = jest.fn(() => Promise.resolve({
        status: 400,
        json: jsonFn,
      }));
      expect.assertions(1);

      try {
        await patchJson(getToken, '/api/test/', { tst: 7 });
      } catch (error) {
        expect(error).toBeInstanceOf(ServerValidationError);
      }
    });
  });

  describe('deleteJson()', () => {
    it('should delete JSON data', async () => {
      const result = await deleteJson(getToken, '/api/test/');
      expect(result).toEqual(1);
      expect(window.fetch).toBeCalledWith(`${remoteURL}/api/test/`, {
        method: httpMethods.delete,
        headers: {
          'x-access-token': '1qwe',
        },
      });
      expect(jsonMock).toBeCalled();
    });

    it('should throw a FetchError if fetch failed', async () => {
      window.fetch = jest.fn(() => Promise.reject(new Error('TST')));
      expect.assertions(1);

      try {
        await deleteJson(getToken, '/api/test/');
      } catch (error) {
        expect(error).toBeInstanceOf(FetchError);
      }
    });

    it('should throw a ServerError if response is not 200', async () => {
      const jsonFn = jest.fn(() => Promise.resolve({ message: 'Fail' }));
      window.fetch = jest.fn(() => Promise.resolve({
        status: 400,
        json: jsonFn,
      }));
      expect.assertions(1);

      try {
        await deleteJson(getToken, '/api/test/');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerError);
      }
    });
  });
});
