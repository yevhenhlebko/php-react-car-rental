import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Input } from 'semantic-ui-react';

import { carArray } from '../assets/car-array';
import CustomModal from '../components/modal';
import { MIN_RESERVATION_HOUR } from '../assets/const';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ReservationConfirm () {
  const query = useQuery();
  const history = useHistory();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [hours, setHours] = useState(0);
  const [rate, setRate] = useState(0);
  const [carName, setCarName] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [timezone, setTimezone] = useState(0);
  const [carId, setCarId] = useState();
  const [selectedCarData, setSelectedCarData] = useState();

  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  const gotoBack = () => {
    if (date && time && timezone && hours) {
      history.push(`/car-select?date=${date}&time=${time}&timezone=${timezone}&hours=${hours}`);
    }
  };

  const confirmReservation = () => {};

  const hoursChange = (hours) => {
    const hoursNum = parseInt(hours);
    if (!hoursNum || hoursNum < MIN_RESERVATION_HOUR) {
      setModalContent(`Reservation hour should at least ${MIN_RESERVATION_HOUR}.`);
      setOpen(true);
      setHours(MIN_RESERVATION_HOUR);
      setTotalCost(selectedCarData.rate * MIN_RESERVATION_HOUR);
      return;
    }
    setHours(hoursNum);
    // calculate total cost
    if (selectedCarData) {
      setTotalCost(selectedCarData.rate * hoursNum);
    }
  };

  useEffect(() => {
    setDate(query.get('date'));
    setTime(query.get('time'));
    setHours(parseInt(query.get('hours')));
    setTimezone(query.get('timezone'));
    setCarId(parseInt(query.get('car-id')));

    if (!query.get('date') || !query.get('time') || parseInt(query.get('hours')) < 2) {
      setModalContent('Input params are not valid!');
      setOpen(true);
      return;
    }

    const carData = carArray.find(item => item.id === parseInt(query.get('car-id')));
    if (!carData) {
      setModalContent('Car ID is not valid!');
      setOpen(true);
    } else {
      setSelectedCarData(carData);
      setRate(carData.rate);
      setCarName(carData.name);
      setTotalCost(carData.rate * parseInt(query.get('hours')));
    }
  }, []);

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
            <div>{ carName }</div>
          </div>

          <div className="flex flex-row mb-4">
            <span className="mr-3">Date:</span>
            <span className="">{ date }</span>
          </div>

          <div className="flex flex-row mb-4">
            <span className="mr-3">Hourly Cost:</span>
            <span className="">${rate}</span>
          </div>

          <div className="flex flex-row mb-4 items-center">
            <span className="mr-3">Total Hours:</span>
            <Input
              className="semantic-ui-input w-32"
              value={hours}
              onChange={e => hoursChange(e.target.value)}
            />
          </div>

          <div className="flex flex-row">
            <span className="mr-3">Total Cost:</span>
            <span className="">${ totalCost }</span>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            className="border rounded-lg px-3 py-2 text-white font-inter bg-black w-32 font-bold capitalize mr-5"
            onClick={() => gotoBack()}
          >
            Back
          </button>

          <button
            className={`border rounded-lg px-3 py-2 text-white font-inter bg-black w-32 font-bold capitalize`}
            onClick={() => confirmReservation()}
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
