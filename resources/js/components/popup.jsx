import React, { useState } from "react";
import { Popup } from "semantic-ui-react";

function ControlledPopup(props) {
  const { id, onSubmit, trigger } = props;
  const [showPopup, setShowPopUp] = useState(false);

  const handleSubmit = (reason) => {
    setShowPopUp(false);
    onSubmit(id, reason);
  };

  return (
    <Popup
      content={
        <div className="text-white bg-black -mx-4">
          <label className="block text-center text-white text-xl font-bold mb-2">Select Reason</label>
          <ul>
            <li
              className="text-left block py-2 px-4 text-white cursor-pointer font-normal hover:font-bold"
              onClick={() => handleSubmit(id, 2)}
            >
              User Request
            </li>
            <li
              className="text-left block py-2 px-4 text-white cursor-pointer font-normal hover:font-bold"
              onClick={() => handleSubmit(id, 3)}
            >
              User's not available
            </li>
            <li
              className="text-left block py-2 px-4 text-white cursor-pointer font-normal hover:font-bold"
              onClick={() => handleSubmit(id, 4)}
            >
              Other
            </li>
          </ul>
        </div>
      }
      on="click"
      pinned
      basic
      trigger={trigger}
      open={showPopup}
      onOpen={() => setShowPopUp(true)}
      onClose={() => setShowPopUp(false)}
    />
  );
}

export default ControlledPopup;
