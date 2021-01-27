import React, { useState } from "react";
import { Form, Grid, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createContact } from "../redux/contacts/contactAction";
import { useDispatch } from "react-redux";

const AddContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [contactType, setContactType] = useState("")
  // const [contactTypeValue, setContactTypeValue] = useState("")
  const [date, setDate] = useState(new Date("2014-08-18T21:11:54"));
  const [calendar, setCalendar] = useState(false);
  const [hidden, setHIdden] = useState(true);
  const dispatch = useDispatch();

  const handleOptionChange = () => {
    setHIdden(!hidden);
  };

  const dateChange = (date) => {
    setDate(date);
  };

  const calendarChange = () => {
    setCalendar(!calendar);
  };

  const contactOptions = [
    { key: "mobile-phone", value: "mobile-phone", text: "Mobitel" },
    { key: "phone", value: "phone", text: "Fiksni" },
    { key: "email", value: "email", text: "Email" },
    { key: "pager", value: "pager", text: "Pager" },
  ];

  const handleSubmitContact = (e) => {
    e.preventDefault();
    let contact = {
      firstName,
      lastName,
      //date,
      // contactType,
      // contactTypeValue,
    };

    dispatch(createContact(contact));
  };

  return (
    <Grid textAlign="center" style={{ height: "70vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size="large" onSubmit={handleSubmitContact}>
          <Form.Input
            fluid
            type="text"
            name="first name"
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* {values.firstName && <p>{values.firstName}</p>} */}
          <Form.Input
            fluid
            type="text"
            name="lastName"
            placeholder="Last name"
            // value={values.LastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Form.Button onClick={calendarChange}>Pick a date</Form.Button>
          {calendar ? <Calendar onChange={dateChange} value={date} /> : null}
          <Form.Select
            placeholder="Select type of contact"
            options={contactOptions}
            onChange={handleOptionChange}
          />
          {hidden ? null : (
            <Form.Input type="text" name="contactOptionsValue" />
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
