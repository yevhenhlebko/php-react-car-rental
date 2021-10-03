import client from './client';

export const getAllReservations = () => {
  return client('/api/reservations')
    .then(data => data)
    .catch(() => null);
};

export const acceptReservation = (id) => {
  return client('/api/accept-reservation', { body: { id }})
    .then(data => data)
    .catch(() => null);
};

export const declineReservation = (id) => {
  return client('/api/decline-reservation', { body: { id }})
    .then(data => data)
    .catch(() => null);
};
