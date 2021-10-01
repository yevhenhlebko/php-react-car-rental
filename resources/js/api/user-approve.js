import client from './client';

export const setUserAction = ({ action, id }) => {
  return client('/api/setUserAction', { body: { action, id } })
  .then(({ status }) => status)
    .catch(() => null);
}
