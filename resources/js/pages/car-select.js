import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
var moment = require('moment');

import { getDisabledCars } from '../api/availability';
import { carArray } from '../assets/car-array';
import { MIN_RESERVATION_HOUR } from '../assets/const';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CarSelect () {
  const query = useQuery();
  const history = useHistory();
  const [selectedCarIndex, setSelectedCarIndex] = useState();
  const [enableNext, setEnableNext] = useState(false);

  const gotoBack = () => {
    history.push('/date-select');
  };

  const gotoNext = () => {
    const date = query.get('date');
    const time = query.get('time');
    const timezone = query.get('timezone');
    const hours = query.get('hours');
    if (enableNext && selectedCarIndex && date && time && timezone && hours) {
      history.push(`/reservation-confirm?date=${date}&time=${time}&timezone=${timezone}&hours=${hours}&car-id=${selectedCarIndex}`);
    }
  };

  const selectCar = (carItem) => {
    setSelectedCarIndex(carItem.id);
    setEnableNext(!carItem.disabled);
  };

  useEffect(() => {
    const date = query.get('date');
    const time = query.get('time');
    const timezone = query.get('timezone');
    const hours = parseInt(query.get('hours'));
    if (date && time && timezone && hours >= MIN_RESERVATION_HOUR) {
      const momentStartDate = moment.tz(`${date} ${time}`, 'YYYY/MM/DD HH:mm', timezone);
      const momentEndDate = moment.tz(`${date} ${time}`, 'YYYY/MM/DD HH:mm', timezone).add(hours, 'hours');
      momentStartDate.utc();
      momentEndDate.utc();
      const startDate = momentStartDate.format('YYYY-MM-DD HH:mm');
      const endDate = momentEndDate.format('YYYY-MM-DD HH:mm');
      getDisabledCars({ startDate, endDate }).then(res => {});
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-black">
      <div className="p-20 md:p-8 flex flex-col items-center">
          <div className="ajs-header text-3xl md:text-6xl text-center leading-loose text-white font-bungee font-bold">
            AJ’s Experience
          </div>
      </div>

      <div className="box-border form-box-shadow mix-blend-normal rounded-3xl border-grey-light w-5/6 md:w-1/2 px-10 md:px-20 py-10 md:py-20 bg-black">
        <div className="flex flex-col md:flex-row justify-between items-center px-3 md:px-8 py-4">
          {
            carArray.map((carItem, index) => (
              <div
                className="flex flex-col mb-5 md:mb-0 w-5/6 md:w-1/4 items-center"
                key={index}
                onClick={() => selectCar(carItem)}
              >
                <img className={`w-full h-auto rounded-xl border-white border-2 border-solid ${ selectedCarIndex === carItem.id ? 'form-box-shadow' : '' } ${ carItem.disabled ? 'filter grayscale' : '' }`} src={carItem.image} />
                <div className="text-white text-xs text-center pt-2">{ carItem.name }</div>
              </div>
            ))
          }
        </div>

        <div className="mt-10 flex justify-center">
          <button
            className="border rounded-lg px-3 py-2 text-white font-inter bg-black w-32 font-bold capitalize mr-5"
            onClick={() => gotoBack()}
          >
            Back
          </button>

          <button
            className={`border rounded-lg px-3 py-2 text-white font-inter bg-black w-32 font-bold capitalize ${ enableNext ? '' : 'opacity-50 pointer-events-none' }`}
            onClick={() => gotoNext()}
          >
            Next
          </button>
        </div>
      </div>      
    </div>
  );
}

export default CarSelect;
