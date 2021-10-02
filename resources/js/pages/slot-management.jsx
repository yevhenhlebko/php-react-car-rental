import React from "react";

function SlotManagement() {
  return (
    <div className="flex justify-center items-center w-full py-4 flex-col min-h-screen bg-black">
      <div className="p-8 flex flex-col items-center">
        <div className="ajs-header text-3xl md:text-6xl text-center leading-loose text-white font-bungee font-bold">
          AJ’s Experience
        </div>
      </div>

      <div className="box-border form-box-shadow mix-blend-normal rounded-3xl border-grey-light w-3/4 sm:w-1/2 lg:w-2/5 xl:w-1/4 px-8 py-4 bg-black">
        Slot Management
      </div>
    </div>
  );
}

export default SlotManagement;
