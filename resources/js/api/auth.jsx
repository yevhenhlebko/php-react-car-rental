import client from "./client";

export const login = ({ email, password, goCode }) =>
  client("/api/login", { body: { email, password, goCode } }).then(({ data: user, meta: { token } }) => ({
    user,
    token,
  }));

// eslint-disable-next-line camelcase
export const register = ({ email, name, password, password_confirmation, goCode }) =>
  client("/api/register", {
    body: { email, name, password, password_confirmation, goCode },
  }).then(({ data: user, meta: { token } }) => ({ user, token }));

export const getGoCode = () =>
  client("/api/go-code").then((data) => data);

export const application = ({ name }) =>
  client("/api/application", { body: { name } })
    .then(({ data: user }) => ({ user }))
    .catch(() => null);

export const forgotPassword = ({ email }) =>
  client("/api/password/email", { body: { email } }).then(({ status }) => status);

// eslint-disable-next-line camelcase
export const resetPassword = ({ token, email, password, password_confirmation }) =>
  client("/api/password/reset", { body: { token, email, password, password_confirmation } }).then(
    ({ status }) => status,
  );

export const logout = () => client("/api/logout", { body: {} });

export const getUser = () =>
  client("/api/me")
    .then(({ data }) => data)
    .catch(() => null);

export const getUsers = () =>
  client("/api/getUsers")
    .then((data) => data)
    .catch(() => null);
