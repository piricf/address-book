import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllContacts, deleteContact } from "../redux/contacts/contactAction";
import ContactCardForm from "./ContactCardForm";

const AddressBookForm = () => {
  const dispatch = useDispatch();

  const userUid = useSelector((state) => state.userReducer.user.user.uid);
  const contacts = useSelector((state) => state.contactReducer.contact);

  console.log("contact", contacts);

  useEffect(() => {
    dispatch(getAllContacts(userUid));
  }, [dispatch, userUid]);

  const deleteContactHandler = (userUid) => {
    dispatch(deleteContact(userUid));
  };

  return (
    <div>
      <p>AddressBookForm</p>
      {contacts?.map((contact, i) => (
        <ContactCardForm
          key={i}
          firstName={contact.firstName}
          lastName={contact.lastName}
          deleteContactHandler={deleteContactHandler}
          id={contact.id}
        />
      ))}
    </div>
  );
};

export default AddressBookForm;
