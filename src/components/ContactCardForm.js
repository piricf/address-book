import React from "react";

const ContactCardForm = ({ firstName, lastName, deleteContactHandler, id }) => {
  const deleteContact = () => {
    deleteContactHandler(id);
  };

  return (
    <div>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <button onClick={() => deleteContact(id)}>Delete</button>
    </div>
  );
};

export default ContactCardForm;
