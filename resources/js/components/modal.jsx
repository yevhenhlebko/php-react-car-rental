import React from "react";
import { Modal } from "semantic-ui-react";

function CustomModal(props) {
  const { open, show, hide, content, ...rest } = props;

  return (
    <Modal onClose={() => hide()} onOpen={() => show()} open={open} {...rest}>
      <Modal.Header>Error</Modal.Header>

      <Modal.Content>
        <Modal.Description>
          <div>{content}</div>
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <button
          className="border rounded-2xl	px-3 py-2 text-white font-inter bg-black w-20 font-bold"
          onClick={() => hide()}
        >
          Close
        </button>
      </Modal.Actions>
    </Modal>
  );
}

export default CustomModal;
