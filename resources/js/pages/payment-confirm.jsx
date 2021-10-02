import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PaymentConfirmation() {
  const [totalCost, setTotalCost] = useState(0);
  const query = useQuery();

  useEffect(() => {
    setTotalCost(query.get("total-cost"));
  }, []);

  return (
    <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-black">
      <div className="p-20 md:p-8 flex flex-col items-center">
        <div className="ajs-header text-3xl md:text-6xl text-center leading-loose text-white font-bungee font-bold">
          AJ’s Experience
        </div>
      </div>

      <div className="box-border form-box-shadow mix-blend-normal rounded-3xl border-grey-light w-5/6 md:w-1/2 px-10 md:px-20 py-10 md:py-20 bg-black flex flex-col items-center">
        <div className="flex flex-col items-center text-white text-xl md:text-3xl width-fit-content">
          <div className="width-fit-content text-xl md:text-3xl font-thin text-center">
            Use your Zelle account to send <span className="font-bold">${totalCost}</span> to:
          </div>
          <span className="mt-5 width-fit-content text-xl md:text-3xl font-bold">815-260-7682</span>
          <div className="mt-5 width-fit-content text-center text-base md:text-lg font-thin w-full md:w-2/3">
            Once payment has been received, a confirmation email will be sent to your address on file.
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentConfirmation;
