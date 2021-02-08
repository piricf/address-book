import React, { useState } from "react";
import { Button, Modal, Icon } from "semantic-ui-react";
import AddContactForm from "./AddContactForm";

const ContactModal = ({ contactList, id }) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Icon
          style={{
            position: "absolute",
            marginLeft: "660px",
            marginTop: "22px",
            fontSize: "22px",
          }}
          name="edit outline"
        ></Icon>
      }
    >
      <Modal.Header>Update your contact</Modal.Header>
      <Modal.Content>
        <AddContactForm contactList={contactList} id={id} isEdit={true} />
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
