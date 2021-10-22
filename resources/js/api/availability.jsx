import client from "./client";

export const getDisabledCars = ({ startDate, endDate }) =>
  client(`/api/disabled-cars?startdate=${startDate}&enddate=${endDate}`)
    .then((data) => data)
    .catch(() => null);

export const createReservation = ({ startDate, endDate, carId, userId, hours }) =>
  client(`/api/reservation`, { method: "POST", body: { startDate, endDate, carId, userId, hours } })
    .then((data) => data)
    .catch(() => null);

export const confirmReservation = ({ id }) =>
  client(`/api/reservation`, { method: "PUT", body: { id } })
    .then((data) => data)
    .catch(() => null);

export const rejectReservation = ({ id, reason }) =>
  client(`/api/reservation/reject`, { method: "PUT", body: reason && reason.length ? { id, reason } : { id } })
    .then((data) => data)
    .catch(() => null);

export const getReservations = () =>
  client(`/api/reservation-list`)
    .then((data) => data)
    .catch(() => null);
