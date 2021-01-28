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
  const [date, setDate] = useState(new Date("2014-08-18T21:11:54"));
  console.log(date);

  const [calendar, setCalendar] = useState(false);
  const [hidden, setHIdden] = useState(true);
  const dispatch = useDispatch();

  // const dateChange = (date) => {
  //   setDate(date);
  // };
  const hanldeOptionValueAndHidden = (value) => {
    setHIdden(!hidden);
    setContactOptionSelected(value);
  };

  const calendarChange = () => {
    setCalendar(!calendar);
  };

  const { user } = useSelector((state) => state.userReducer);

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
      date,
      contactOptionSelected,
      contactOptionValue,
      userUid,
    };
    dispatch(createContact(contact));
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
          <Form.Input
            type="text"
            name="lastName"
            placeholder="Last name"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Form.Button onClick={calendarChange}>Pick a date</Form.Button>
          {calendar ? (
            <Calendar onChange={(e) => setDate(e.target.date)} />
          ) : null}
          <Form.Select
            placeholder="Select type of contact"
            name={contactOptions.name}
            options={contactOptions}
            onChange={(e, { value }) => hanldeOptionValueAndHidden(value)}
          />
          {hidden ? null : (
            <Form.Input
              type="text"
              name="contactOptionsValue"
              onChange={(e) => setContactOptionValue(e.target.value)}
            />
          )}
          <Button color="teal" fluid size="large" type="submit">
            Add contact
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default AddContactForm;
