import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getDisabledCars } from "../api/availability";
import { MIN_RESERVATION_HOUR } from "../assets/const";
import CustomModal from "../components/modal";
import qs from "query-string";
import moment from "moment-timezone";
import { getAllCars } from "../api/cars";

function CarSelect() {
  const { search } = useLocation();
  const { hours, date, time } = qs.parse(search);
  const history = useHistory();
  const [cars, setCars] = useState([]);
  const [selectedCarIndex, setSelectedCarIndex] = useState();
  const [enableNext, setEnableNext] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    getAllCars().then((cars) => {
      setCars(cars);
    });
  }, [getAllCars, setCars]);

  const gotoBack = useCallback(() => {
    history.push("/date-select");
  }, [history]);

  const gotoNext = useCallback(() => {
    if (enableNext && selectedCarIndex && date && time && hours) {
      history.push(`/reservation-confirm?date=${date}&time=${time}&hours=${hours}&carId=${selectedCarIndex}`);
    } else {
      setModalContent("Something went wrong.");
      setOpen(true);
    }
  }, [date, time, hours, setModalContent, setOpen, history, enableNext, selectedCarIndex]);

  const selectCar = useCallback(
    (carItem) => {
      setSelectedCarIndex(carItem.id);
      setEnableNext(!carItem.disabled);
    },
    [setSelectedCarIndex, setEnableNext],
  );

  useEffect(() => {
    if (date && time && hours >= MIN_RESERVATION_HOUR) {
      const time = moment(time);
      const momentStartDate = moment(date)
        .set({
          hours: time.hours,
          minutes: time.minutes,
        })
        .tz("America/Los_Angeles");
      const momentEndDate = moment(momentStartDate).add(hours, "hours");
      const startDate = momentStartDate.toISOString();
      const endDate = momentEndDate.toISOString();
      getDisabledCars({ startDate, endDate }).then((res) => {});
    }
  }, [date, time, hours, moment]);

  return (
    <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-black">
      <div className="p-20 md:p-8 flex flex-col items-center">
        <div className="ajs-header text-3xl md:text-6xl text-center leading-loose text-white font-bungee font-bold">
          AJ’s Experience
        </div>
      </div>

      <div className="box-border form-box-shadow mix-blend-normal rounded-3xl border-grey-light w-5/6 md:w-1/2 px-10 md:px-20 py-10 md:py-20 bg-black">
        <div className="flex flex-col md:flex-row justify-between items-center px-3 md:px-8 py-4">
          {cars.map((carItem, index) => (
            <div
              className="flex flex-col mb-5 md:mb-0 w-5/6 md:w-1/4 items-center"
              key={index}
              onClick={() => selectCar(carItem)}
            >
              <img
                className={`w-full h-auto rounded-xl border-white border-2 border-solid ${
                  selectedCarIndex === carItem.id ? "form-box-shadow" : ""
                } ${carItem.disabled ? "filter grayscale" : ""}`}
                src={carItem.image}
              />
              <div className="text-white text-xs text-center pt-2">{carItem.name}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            className="border rounded-lg px-3 py-2 text-white font-inter bg-black w-32 font-bold capitalize mr-5"
            onClick={gotoBack}
          >
            Back
          </button>

          <button
            className={`border rounded-lg px-3 py-2 text-white font-inter bg-black w-32 font-bold capitalize ${
              enableNext ? "" : "opacity-50 pointer-events-none"
            }`}
            onClick={gotoNext}
          >
            Next
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

export default CarSelect;
