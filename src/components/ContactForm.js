import React, { useState } from "react";
import { Form, Grid, Button, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createContact } from "../redux/contacts/contactAction";
import { useDispatch, useSelector } from "react-redux";

const AddContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactOptionSelected, setContactOptionSelected] = useState("");
  const [contactOptionValue, setContactOptionValue] = useState("");
  const [birthDate, setBirthDate] = useState(new Date("2014-08-18T21:11:54"));

  const { user } = useSelector((state) => state.userReducer);

  const [calendar, setCalendar] = useState(false);
  const [hidden, setHIdden] = useState(true);
  const dispatch = useDispatch();

  const dateChange = (value) => {
    setBirthDate(value);
  };
  const hanldeOptionValueAndHidden = (value) => {
    setHIdden(!hidden);
    setContactOptionSelected(value);
  };

  const calendarChange = () => {
    setCalendar(!calendar);
  };

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    contactOptionValue: "",
    contactOptionSelected: "",
  });

  const validation = () => {
    let error = {
      firstName: "",
      lastName: "",
      contactOptionValue: "",
      contactOptionSelected: "",
      birthDate: "",
    };
    if (!firstName) {
      error.firstName = "First name is required";
    } else if (firstName > 100) {
      error.firstName = "First name should be under 100 characters";
    }
    if (!lastName) {
      error.lastName = "Last name is required";
    } else if (lastName > 300) {
      error.lastName = "Last name should be under 300 characters";
    }
    if (!contactOptionValue) {
      error.contactOptionValue =
        "Phone, mobile phone, email or pager is required";
    }
    if (!contactOptionSelected) {
      error.contactOptionSelected = "You have to select type of contact";
    }
    if (!birthDate) {
      error.birthDate = "Must pick the date";
    }
    setErrors(error);
  };

  let contactOptions = [
    { key: "mobile-phone", value: "mobile-phone", text: "Mobitel" },
    { key: "phone", value: "phone", text: "Fiksni" },
    { key: "email", value: "email", text: "Email" },
    { key: "pager", value: "pager", text: "Pager" },
  ];

  const handleSubmitContact = (e) => {
    e.preventDefault();
    let userUid = user.user.uid;
    let contact = {
      firstName,
      lastName,
      birthDate: birthDate.toDateString(),
      contactOptionSelected,
      contactOptionValue,
      userUid,
    };
    if (
      errors.firstName === "" &&
      errors.lastName === "" &&
      errors.contactOptionValue === "" &&
      errors.contactOptionSelected === "" &&
      errors.birthDate === ""
    ) {
      validation();
    } else {
      dispatch(createContact(contact));
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "70vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header>Create a new contact and it to your contact list! </Header>
        <Form size="large" onSubmit={handleSubmitContact} id="contactForm">
          <Form.Input
            type="text"
            name="firstName"
            placeholder="First name"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName !== "" ? (
            <p style={{ color: "red" }}>{errors.firstName}</p>
          ) : null}
          <Form.Input
            type="text"
            name="lastName"
            placeholder="Last name"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName ? (
            <p style={{ color: "red" }}>{errors.lastName}</p>
          ) : null}
          <Form.Button onClick={calendarChange}>Pick a date</Form.Button>
          {calendar ? (
            <Calendar onChange={(value) => dateChange(value)} />
          ) : null}
          {errors.birthDate !== "" ? <p>{errors.birthDate}</p> : null}
          <Form.Select
            placeholder="Select type of contact"
            name={contactOptions.text}
            options={contactOptions}
            onChange={(e, { value }) => hanldeOptionValueAndHidden(value)}
          />
          {errors.contactOptionSelected !== "" ? (
            <p style={{ color: "red" }}>{errors.contactOptionSelected}</p>
          ) : null}
          {hidden ? null : (
            <Form.Input
              type="text"
              name="contactOptionsValue"
              onChange={(e) => setContactOptionValue(e.target.value)}
            />
          )}
          {errors.contactOptionValue !== "" ? (
            <p style={{ color: "red" }}>{errors.contactOptionValue}</p>
          ) : null}
          <Button color="teal" fluid size="large" type="submit">
            Add contact
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default AddContactForm;
