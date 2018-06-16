import Cookies from 'js-cookie';

const REMOTE_TOKEN_KEY = 'auth';
const TOKEN_KEY = 'checkAuth';
export const COOKIE_EXPIRATION_DELAY = 14; // days

export const getDomain = () => {
  const parts = window.location.hostname.split('.');
  parts.shift();
  let domain = parts.join('.');

  if (!domain) {
    domain = 'localhost';
  } else {
    domain = `.${domain}`;
  }

  return domain;
};

export const getToken = () => Cookies.get(TOKEN_KEY, {
  domain: getDomain(),
});

export const getRemoteToken = () => Cookies.get(REMOTE_TOKEN_KEY, {
  domain: getDomain(),
});

export const setToken = token => Cookies.set(TOKEN_KEY, token, {
  expires: COOKIE_EXPIRATION_DELAY,
  domain: getDomain(),
});

export const unsetToken = () => Cookies.remove(TOKEN_KEY, {
  domain: getDomain(),
});
