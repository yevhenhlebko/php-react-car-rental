import React, { useState } from "react";
import { Popup } from "semantic-ui-react";

function ControlledPopup(props) {
  const { id, onSubmit, trigger } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [reason, setReason] = useState("");

  const handleOpen = () => {
    setShowPopup(true);
    setReason("");
  };

  const handleClose = () => {
    setShowPopup(false);
    setReason("");
  };

  const handleSubmit = () => {
    onSubmit(id, reason);
    setShowPopup(false);
    setReason("");
  };

  const handleChangeReason = (e) => {
    setReason(e.target.value);
  };

  return (
    <Popup
      content={
        <div className="text-white bg-black -mx-4">
          <label className="block text-center text-white text-xl font-bold mb-2">Reason(optional)</label>
          <textarea
            className="mx-4 my-2 p-1 text-white bg-black border outline-none"
            maxLength="255"
            onChange={handleChangeReason}
          />
          <button
            className="block border rounded-2xl px-3 py-2 text-white font-inter bg-black w-30 font-bold m-auto"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      }
      on="click"
      pinned
      basic
      position="top center"
      trigger={trigger}
      open={showPopup}
      onOpen={handleOpen}
      onClose={handleClose}
    />
  );
}

export default ControlledPopup;
