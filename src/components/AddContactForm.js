import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../redux/contacts/contactAction";

const AddContactForm = () => {
  const dispatch = useDispatch();
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    birthDate: new Date("2014-08-18T21:11:54"),
    // contactOptionsSelected: "",
    // contactOptionsValue: "",
  });

  const { user } = useSelector((state) => state.userReducer);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
  });
  const [closeCalendar, setCloseCalendar] = useState(false);
  const closeCalendarHandler = () => {
    setCloseCalendar(!closeCalendar);
  };

  const validation = (contactData) => {
    let errors = {};

    if (!contactData.firstName) {
      errors.firstName = "First name is required";
    } else if (contactData.firstName > 100) {
      errors.firstName = "First name should be under 100 characters";
    }
    if (!contactData.lastName) {
      errors.lastName = "Last name is required";
    } else if (contactData.lastName > 300) {
      errors.lastName = "Last name should be under 300 characters";
    }
    if (!contactData.birthDate) {
      errors.birthDate = "Must pick the date";
    }
    // if (!contactData.contactOptionValue) {
    //   errors.contactOptionValue =
    //     "Phone, mobile phone, email or pager is required";
    // }
    // if (!contactData.contactOptionSelected) {
    //   errors.contactOptionSelected = "You have to select type of contact";
    //}

    return errors;
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    setContactData({
      ...contactData,
      [name]: value,
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    let userUid = user.user.uid;
    console.log("im in submit", contactData.firstName);
    let contact = {
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      birthDate: contactData.birthDate.toDateString(),
      userUid,
    };
    if (contact.firstName !== "" && contact.lastName !== "") {
      dispatch(createContact(contact));
    } else {
      setErrors(validation(contactData));
    }
    console.log("contactData", contact);
  };

  console.log("contact data", contactData);
  return (
    <Form onSubmit={handleContactSubmit} noValidate>
      <Form.Input
        type="text"
        placeholder="First Name"
        name="firstName"
        value={contactData.firstName}
        onChange={handleContactChange}
        noValidate
      />
      {console.log("from return", errors.firstName)}
      {errors.firstName && <p>{errors.firstName}</p>}
      <Form.Input
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={contactData.lastName}
        onChange={handleContactChange}
        noValidate
      />
      {errors.lastName && <p>{errors.lastName}</p>}
      <Button color="facebook" onClick={closeCalendarHandler}>
        {!closeCalendar ? <p>Date of Birth</p> : <p>Close</p>}
      </Button>
      {closeCalendar ? (
        <Calendar
          name="birthDate"
          value={contactData.birthDate}
          onChange={handleContactChange}
          noValidate
        />
      ) : null}
      {errors.birthDate && <p>{errors.birthDate}</p>}
      <Button type="submit">Add Contact</Button>
    </Form>
  );
};
export default AddContactForm;
