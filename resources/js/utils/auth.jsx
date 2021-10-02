const authToken = "auth_token";
const intendedUrl = "intendedUrl";
const memberIntendedUrl = "/date-select";
const adminIntendedUrl = "/slot-management";

export const getToken = () => window.localStorage.getItem(authToken);

export const setToken = (token) => {
  token ? window.localStorage.setItem(authToken, token) : window.localStorage.removeItem(authToken);
};

export const getIntendedUrl = (isAdmin) =>
  window.localStorage.getItem(intendedUrl) || (isAdmin ? adminIntendedUrl : memberIntendedUrl);

export const setIntendedUrl = (url) => {
  url ? window.localStorage.setItem(intendedUrl, url) : window.localStorage.removeItem(intendedUrl);
};
