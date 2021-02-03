import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Pagination } from "semantic-ui-react";
import { getAllContacts, deleteContact } from "../redux/contacts/contactAction";
import ContactCardForm from "./ContactCardForm";
import "semantic-ui-css/semantic.min.css";

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
      <Header
        textAlign="center"
        style={{ height: "5vh" }}
        verticalAlign="middle"
      >
        Your Address book!
      </Header>
      {contacts?.map((contact, i) => (
        <ContactCardForm
          key={i}
          firstName={contact?.firstName}
          lastName={contact?.lastName}
          deleteContactHandler={deleteContactHandler}
          id={contact?.id}
        />
      ))}
      <Pagination defaultActivePage={5} totalPages={10} />
    </div>
  );
};

export default AddressBookForm;