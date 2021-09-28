import client from './client';

export const getDisabledCars = ({ startDate, endDate }) => {
  return client(`/api/disabled-cars?startdate=${startDate}&enddate=${endDate}`)
    .then(data => data)
    .catch(() => null);
}