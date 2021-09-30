import client from './client';

export const getDisabledCars = ({ startDate, endDate }) => {
  return client(`/api/disabled-cars?startdate=${startDate}&enddate=${endDate}`)
    .then(data => data)
    .catch(() => null);
}

export const confirmAvailability = ({
  startDate,
  endDate,
  carId,
  userId,
  hours
}) => {
  return client(`/api/confirm-reservation?startdate=${startDate}&enddate=${endDate}&carid=${carId}&userid=${userId}&hours=${hours}`)
    .then(data => data)
    .catch(() => null);
};
