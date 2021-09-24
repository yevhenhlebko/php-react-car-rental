import React, { useState, useEffect } from 'react';
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import TimezonePicker from 'react-timezone';
var moment = require('moment-timezone');

function DateSelect () {
  let [time, setTime] = useState('');
  let [date, setDate] = useState('');
  let [minDate, setMinDate] = useState('');
  let [timezone, setTimezone] = useState('');

  const dateChanged = (event, { name, value }) => {
    setDate(value);
  };

  const timeChanged = (event, { name, value }) => {
    setTime(value);
  };

  const getTodayDate = (timezoneOffset) => {
    let today = new Date();
    if (timezoneOffset !== undefined) {
      let d = new Date();
      let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      today = new Date(utc + (60000 * timezoneOffset));
    }
    
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;
    return today;
  };

  useEffect(() => {
    if (timezone) {
      const utcOffset = moment().tz(timezone).utcOffset();
      setMinDate(getTodayDate(utcOffset));
    }
  }, [timezone]);

  useEffect(() => {
    setMinDate(getTodayDate());
  }, []);

  return (
    <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-black">
      <div className="p-8 flex flex-col items-center">
          <div className="ajs-header text-6xl leading-loose text-white font-bungee font-bold">
            AJ’s Experience
          </div>
      </div>

      <div className="box-border form-box-shadow mix-blend-normal rounded-3xl border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4 bg-black">        
        <div className="flex flex-col px-8 py-4">
          <DateInput
            className="semantic-date-picker mb-3"
            name="date"
            value={date}
            placeholder="Select Date"
            onChange={(event, data) => dateChanged(event, data)}
            minDate={minDate}
            dateFormat="YYYY/MM/DD" />
          <TimeInput
            className="semantic-time-picker mb-3"
            name="time"
            value={time}
            placeholder="Select Time"
            onChange={(event, data) => timeChanged(event, data)} />
          <TimezonePicker
            className="timezone-picker"
            value={timezone}
            onChange={timezone => setTimezone(timezone)}
            inputProps={{
              placeholder: 'Select Timezone',
              name: 'timezone',
            }} />
        </div>

        <div className="mb-10 mt-10 flex justify-center">
          <button type="submit" className="border rounded-2xl	px-3 py-2 text-white font-inter bg-black w-20 font-bold">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DateSelect;
