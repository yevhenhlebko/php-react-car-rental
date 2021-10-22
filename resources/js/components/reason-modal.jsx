import React from "react";
import { Modal } from "semantic-ui-react";

function ReasonModal(props) {
  const { id, reason, onClose, onSubmit, onChange, header = "Reason(optional)", ...rest } = props;

  return (
    <Modal onClose={onClose} {...rest}>
      <Modal.Header>{header}</Modal.Header>

      <Modal.Content>
        <Modal.Description>
          <textarea className="p-2 w-full text-black border outline-none" maxLength="255" onChange={onChange} />
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <div className="flex justify-end">
          <button
            className="border rounded-2xl px-3 py-2 text-white font-inter bg-black w-20 font-bold mx-1"
            onClick={() => onSubmit(id, reason)}
          >
            Confirm
          </button>
          <button
            className="border rounded-2xl px-3 py-2 text-white font-inter bg-black w-20 font-bold"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </Modal.Actions>
    </Modal>
  );
}

export default ReasonModal;
