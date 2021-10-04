import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Input } from "semantic-ui-react";
import moment from "moment-timezone";
import CustomModal from "../components/modal";
import { MIN_RESERVATION_HOUR } from "../assets/const";
import { useAuth } from "../context/auth";
import qs from "query-string";
import { getAllCars } from "../api/cars";
import { createReservation } from "../api/availability";

function ReservationConfirm() {
  const {
    currentUser: { id: userId },
  } = useAuth();
  const [cars, setCars] = useState([]);
  const { search } = useLocation();
  const { hours: selectedHours, date, time, carId } = qs.parse(search);
  const history = useHistory();

  const [hours, setHours] = useState(parseInt(selectedHours));
  const [totalCost, setTotalCost] = useState(0);
  const [selectedCarData, setSelectedCarData] = useState();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  useEffect(() => {
    getAllCars().then((cars) => {
      setCars(cars);
    });
  }, [getAllCars, setCars]);

  useEffect(() => {
    if (selectedCarData && selectedCarData.rate && hours >= 0) {
      setTotalCost(selectedCarData.rate * hours);
    }
  }, [selectedCarData, hours]);

  useEffect(() => {
    if (cars.length > 0 && carId) {
      const carData = cars.find((item) => item.id === parseInt(carId));
      if (!carData) {
        setModalContent("Car ID is not valid!");
        setOpen(true);
      } else {
        setSelectedCarData(carData);
      }
    }
  }, [setModalContent, setOpen, setSelectedCarData, carId, cars]);

  const gotoBack = useCallback(() => {
    if (date && time && hours) {
      history.push(`/car-select?date=${date}&time=${time}&hours=${hours}`);
    }
  }, [date, time, hours, history]);

  const handleConfirmReservation = useCallback(() => {
    setError(false);

    if (!hours || hours < MIN_RESERVATION_HOUR) {
      setModalContent(`Reservation should be at least ${MIN_RESERVATION_HOUR} hours.`);
      setOpen(true);
      setHours(MIN_RESERVATION_HOUR);
      return;
    }

    setLoading(true);
    const startDate = moment(`${date} ${time}`)
      .tz("America/Los_Angeles", true)
      .toISOString();
    const endDate = moment(startDate)
      .add(hours, "hours")
      .toISOString();
    createReservation({ startDate, endDate, carId, userId, hours })
      .then((response) => {
        if (response.reservation && response.reservation.user_id) {
          history.push(`/payment-confirm?total-cost=${totalCost}`);
        } else {
          setError(true);
        }
        // eslint-disable-next-line handle-callback-err
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
    // call Confirmation API, if success, then redirect to Payment Confirmation page
  }, [date, time, hours, carId, userId, totalCost, createReservation, setLoading, setError, history]);

  const hoursChange = useCallback(
    (hours) => {
      const num = parseInt(hours && hours !== "" ? hours : 0);
      setHours(num);
    },
    [setHours],
  );

  if (!selectedCarData) return null;

  return (
    <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-black">
      <div className="p-20 md:p-8 flex flex-col items-center">
        <div className="ajs-header text-3xl md:text-6xl text-center leading-loose text-white font-bungee font-bold">
          AJ’s Experience
        </div>
      </div>

      <div className="box-border form-box-shadow mix-blend-normal rounded-3xl border-grey-light w-5/6 md:w-1/2 px-10 md:px-20 py-10 md:py-20 bg-black flex flex-col items-center">
        <div className="flex flex-col text-white text-xl md:text-3xl width-fit-content">
          <div className="flex flex-row mb-4">
            <span className="mr-3">Car:</span>
            <div>{selectedCarData.name}</div>
          </div>

          <div className="flex flex-row mb-4">
            <span className="mr-3">Date:</span>
            <span className="">{date}</span>
          </div>

          <div className="flex flex-row mb-4">
            <span className="mr-3">Time:</span>
            <span className="">{time}</span>
          </div>

          <div className="flex flex-row mb-4">
            <span className="mr-3">Hourly Cost:</span>
            <span className="">${selectedCarData.rate}</span>
          </div>

          <div className="flex flex-row mb-4 items-center">
            <span className="mr-3">Total Hours:</span>
            <Input
              className="semantic-ui-input w-32"
              min={2}
              value={hours}
              onChange={(e) => hoursChange(e.target.value)}
            />
          </div>

          <div className="flex flex-row">
            <span className="mr-3">Total Cost:</span>
            <span className="">${totalCost}</span>
          </div>
        </div>

        {error && <p className="text-red-500 text-xs pt-2">Times selected are not available.</p>}

        <div className="mt-10 flex justify-center">
          <button
            className="border rounded-lg px-3 py-2 text-white font-inter bg-black w-32 font-bold capitalize mr-5"
            onClick={gotoBack}
          >
            Back
          </button>

          <button
            className="border rounded-lg px-3 py-2 text-white font-inter bg-black w-32 font-bold capitalize"
            onClick={handleConfirmReservation}
            disabled={loading}
          >
            Confirm
          </button>
        </div>
      </div>

      <CustomModal
        open={open}
        show={() => setOpen(true)}
        hide={() => setOpen(false)}
        size="tiny"
        content={modalContent}
      />
    </div>
  );
}

export default ReservationConfirm;
