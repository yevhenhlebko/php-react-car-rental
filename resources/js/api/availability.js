import client from './client';

export const getAvailableCars = ({ date, time, hours }) => {
  return client(`/api/available-cars?date=${date}&time=${time}&hours=${hours}`)
    .then(data => data)
    .catch(() => null);
}