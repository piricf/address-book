import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import AddContactForm from "./AddContactForm";

const ContactModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Update your contact</Modal.Header>
      <Modal.Content>
        <AddContactForm isEdit={true} />
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Back
        </Button>
        <Button
          content="Save contact"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ContactModal;
