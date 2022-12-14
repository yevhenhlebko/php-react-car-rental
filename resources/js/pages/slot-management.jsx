import React, { useCallback, useEffect, useState } from "react";
import moment from "moment-timezone";
import { Link } from "react-router-dom";

import Modal from "../components/reason-modal";
import { getReservations, confirmReservation, rejectReservation } from "../api/availability";

function SlotManagement() {
  const [update, setUpdate] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [id, setId] = useState(null);
  const [reason, setReason] = useState("");
  const [showReasonModal, setShowReasonModal] = useState(false);

  useEffect(() => {
    getReservations().then((response) => {
      if (response) {
        setReservations(response.reservations);
      }
    });
  }, [getReservations, update]);

  const handleConfirm = useCallback(
    (id) => {
      confirmReservation({ id }).then((response) => {
        setUpdate(update + 1);
      });
    },
    [confirmReservation, setUpdate, update],
  );

  const handleReject = useCallback(
    (id, reason) => {
      rejectReservation({ id, reason }).then((response) => {
        setUpdate(update + 1);
        handleCloseModal();
      });
    },
    [rejectReservation, setUpdate, update],
  );

  const handleChangeReason = (e) => {
    setReason(e.target.value);
  };

  const handleCloseModal = () => {
    setId(null);
    setReason("");
    setShowReasonModal(false);
  };

  const handleClickReject = (id) => {
    setId(id);
    setReason("");
    setShowReasonModal(true);
  };

  return (
    <div className="flex justify-center items-center w-full flex-col py-4 min-h-screen bg-black">
      <div className="p-8 flex flex-col items-center">
        <div className="ajs-header text-center text-6xl leading-loose text-white font-bungee font-bold">
          <img src="/images/icons/ajexperience.svg" />
        </div>
      </div>

      <div className="mt-3 xl:mt-2 box-border overflow-hidden text-xl form-box-shadow mix-blend-normal rounded-3xl border-grey-light w-3/4 sm:w-5/6 lg:w-11/12 xl:w-4/5 px-8 py-4 bg-black">
        <div className="overflow-auto lg:overflow-visible mb-4 mt-4">
          <div className="card-body w-full bg-black text-white appearance-none  font-inter rounded py-1 px-3">
            {reservations && reservations.length > 0 && (
              <table className="w-full">
                <thead>
                  <tr className="w-full text-center">
                    <th>Name</th>
                    <th>Car</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Status</th>
                    <th className="w-1/5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations ? (
                    reservations.map((reservation, index) => (
                      <tr key={index} className="w-full text-center">
                        <td className="px-3">{reservation.name}</td>
                        <td className="px-3">{reservation.carName}</td>
                        <td className="px-3">
                          {moment
                            .utc(reservation.reserved_date_time)
                            .tz("America/Los_Angeles")
                            .format("MM/DD/YYYY hh:mm A")}
                        </td>
                        <td className="px-3">
                          {moment.utc(reservation.due_date_time).tz("America/Los_Angeles").format("MM/DD/YYYY hh:mm A")}
                        </td>
                        <td className="px-3">
                          {reservation.status == 0 ? "Pending" : reservation.status == 1 ? "Accepted" : "Rejected"}
                        </td>
                        <td>
                          <div className="flex">
                            {reservation.status == 0 && (
                              <p
                                className="flex flex-col px-4 py-4 m-auto"
                                onClick={() => handleConfirm(reservation.id)}
                              >
                                <Link
                                  to="#"
                                  className="border rounded-2xl px-3 py-2 text-white font-inter bg-black w-30 font-bold"
                                >
                                  Accept
                                </Link>
                              </p>
                            )}
                            <p
                              className="flex flex-col px-4 py-4 m-auto"
                              onClick={() => handleClickReject(reservation.id)}
                            >
                              <Link
                                to="#"
                                className="border rounded-2xl px-3 py-2 text-white font-inter bg-black w-30 font-bold"
                              >
                                Reject
                              </Link>
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p className="text-center">Loading...</p>
                  )}
                </tbody>
              </table>
            )}
            {reservations && reservations.length === 0 && <p className="text-center">No reservations found.</p>}
          </div>
        </div>
      </div>
      <Modal
        id={id}
        reason={reason}
        open={showReasonModal}
        size="tiny"
        onClose={handleCloseModal}
        onChange={handleChangeReason}
        onSubmit={handleReject}
      />
    </div>
  );
}

export default SlotManagement;
