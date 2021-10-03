import client from "./client";

export const getDisabledCars = ({ startDate, endDate }) =>
  client(`/api/disabled-cars?startdate=${startDate}&enddate=${endDate}`)
    .then((data) => data)
    .catch(() => null);

export const confirmAvailability = ({ startDate, endDate, carId, userId, hours }) =>
  client(`/api/confirm-reservation`, { method: "POST", body: { startDate, endDate, carId, userId, hours } })
    .then((data) => data)
    .catch(() => null);
