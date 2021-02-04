import React, { useState, useEffect } from "react";
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
    birthDate: new Date(),
    contactType: "",
    contactOptions: {
      mobilePhone: "",
      phone: "",
      email: "",
      pager: "",
    },
  });
  const [closeCalendar, setCloseCalendar] = useState(false);
  const closeCalendarHandler = () => {
    setCloseCalendar(!closeCalendar);
  };

  const userUid = useSelector((state) => state.userReducer.user.user.uid);
  const [error, setError] = useState(false);

  useEffect(() => {
    setContactData({
      ...contactData,
      contactOptions: {
        mobilePhone: "",
        phone: "",
        email: "",
        pager: "",
      },
    });
  }, [contactData.contactType]);

  const contactDataChange = ({ target }) => {
    const { name, value } = target;
    setContactData({
      ...contactData,
      [name]: value,
    });
  };

  const changeStatus = ({ target }) => {
    const { value } = target;
    setContactData({
      ...contactData,
      contactType: value,
    });
  };

  const handleContactOptionsChange = ({ target }) => {
    const { name, value } = target;

    setContactData({
      ...contactData,
      contactOptions: {
        ...contactData.contactOptions,
        [name]: value,
      },
    });
  };

  const validate = (contactData) => {
    let errors = false;

    if (
      !contactData.firstName ||
      !contactData.lastName ||
      !contactData.birthDate ||
      !contactData.contactOptions[contactData.contactType]
    ) {
      errors = true;
    }
    return errors;
  };

  const handleDateChange = (value) => {
    setContactData({
      ...contactData,
      birthDate: value,
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const validation = validate(contactData);

    if (validation) {
      setError(true);
    } else {
      dispatch(createContact(contactData, userUid));
    }
  };

  return (
    <Form onSubmit={handleContactSubmit}>
      <Form.Input
        maxLength="100"
        type="text"
        placeholder="First Name"
        name="firstName"
        onChange={contactDataChange}
        value={contactData.firstName}
      />

      <Form.Input
        maxLength="200"
        type="text"
        placeholder="Last Name"
        name="lastName"
        onChange={contactDataChange}
        value={contactData.lastName}
      />
      <Button color="facebook" onClick={closeCalendarHandler}>
        {!closeCalendar ? <p>Date of Birth</p> : <p>Close</p>}
      </Button>
      {closeCalendar ? (
        <Calendar value={contactData.birthDate} onChange={handleDateChange} />
      ) : null}
      {error && !contactData.firstName && <p>First Name is required</p>}
      {error && !contactData.lastName && <p>Last Name is required</p>}
      <select
        name="contactOptions"
        id="contactOptions"
        placeholder="Select type of contact"
        onChange={changeStatus}
      >
        <option value="" selected hidden>
          Choose here
        </option>

        <option value="mobilePhone" id="mobilePhone">
          Mobile Phone
        </option>
        <option value="phone" id="phone">
          Phone
        </option>
        <option value="email">Email</option>
        <option value="pager"> Pager</option>
      </select>

      {contactData.contactType && (
        <>
          <Form.Input
            name={contactData.contactType || "default"}
            type="text"
            id="inputContact"
            value={contactData.contactOptions[contactData.contactType]}
            onChange={handleContactOptionsChange}
            placeholder={contactData.contactType}
          />
          {error && !contactData.contactOptions[contactData.contactType] && (
            <p>Contact type is required</p>
          )}
        </>
      )}

      <Button type="submit">Add Contact</Button>
    </Form>
  );
};

export default AddContactForm;
