import client from "./client";

export const getAllCars = () =>
  client(`/api/cars`)
    .then((data) => data)
    .catch(() => null);
