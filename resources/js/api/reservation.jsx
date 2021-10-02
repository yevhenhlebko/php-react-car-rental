import client from "./client";

export const reservation = ({ startDate, endDate, carId, userId, hours }) =>
  client("/api/reservation", { body: { startDate, endDate, carId, userId, hours } })
    .then(({ status }) => status)
    .catch(() => null);
