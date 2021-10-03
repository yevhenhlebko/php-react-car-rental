import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";
import { Input } from "semantic-ui-react";

import CustomModal from "../components/modal";
import { MIN_RESERVATION_HOUR } from "../assets/const";

function DateSelect() {
  const history = useHistory();

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState();
  const [minDate, setMinDate] = useState("");
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const dateChanged = (event, { name, value }) => {
    setDate(value);
  };

  const timeChanged = (event, { name, value }) => {
    setTime(value);
  };

  const getTodayDate = () => {
    let today = new Date();

    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();

    today = `${mm}-${dd}-${yyyy}`;
    return today;
  };

  const gotoNext = () => {
    if (date && time && hours >= MIN_RESERVATION_HOUR) {
      // Go to Select Car page
      history.push(`/car-select?date=${date}&time=${time}&hours=${hours}`);
    } else {
      // Show Validation Alert
      if (hours < MIN_RESERVATION_HOUR) {
        setModalContent(`Reservation should be at least ${MIN_RESERVATION_HOUR} hours.`);
        setOpen(true);
        setHours(MIN_RESERVATION_HOUR);
      } else {
        setModalContent("Please make sure all fields are valid.");
        setOpen(true);
      }
    }
  };

  const hoursChange = (val) => {
    if (val) {
      setHours(parseInt(val));
    }
  };

  useEffect(() => {
    setMinDate(getTodayDate());
  }, []);

  return (
    <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-black">
      <div className="p-8 flex flex-col items-center">
        <div className="ajs-header text-3xl md:text-6xl text-center leading-loose text-white font-bungee font-bold">
          AJ’s Experience
        </div>
      </div>

      <div className="box-border form-box-shadow mix-blend-normal rounded-3xl border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4 bg-black">
        <div className="flex flex-col px-3 md:px-8 py-4">
          <DateInput
            className="semantic-date-picker mb-3"
            name="date"
            value={date}
            placeholder="Select Date"
            dateFormat="MM-DD-YYYY"
            onChange={(event, data) => dateChanged(event, data)}
            minDate={minDate}
          />
          <TimeInput
            className="semantic-time-picker mb-3"
            name="time"
            value={time}
            placeholder="Select Time"
            timeFormat="AMPM"
            onChange={(event, data) => timeChanged(event, data)}
          />
          <Input
            className="semantic-ui-input mt-1"
            placeholder="Usage Hours"
            onChange={(e) => hoursChange(e.target.value)}
          />
        </div>

        <div className="mb-10 mt-10 flex justify-center">
          <button
            type="submit"
            className="border rounded-2xl	px-3 py-2 text-white font-inter bg-black w-20 font-bold"
            onClick={() => gotoNext()}
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

export default DateSelect;
