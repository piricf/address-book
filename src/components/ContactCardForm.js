import React, { useState } from "react";
import { Card, List, Grid, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteContact } from "../redux/contacts/contactAction";
import ContactModal from "./ContactModal";
import { Redirect } from "react-router-dom";
import { Rating } from "semantic-ui-react";

const ContactCardForm = ({
  firstName,
  lastName,
  userUid,
  id,
  birthDate,
  contactOptions,
  contactType,
  contactList,
  favorites,
  handleFavorites,
}) => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [details, setDetails] = useState(false);

  const deleteContactById = () => {
    dispatch(deleteContact(userUid, id));
    setRedirect(true);
  };

  const showDetails = () => {
    setDetails(!details);
  };

  const redirectTo = redirect;
  if (redirectTo) {
    return <Redirect to="/adresar" />;
  }

  const formatDate = moment(birthDate).format("DD.MM.YYYY");

  return (
    <Grid
      style={{
        marginBottom: "60px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card style={{ width: "800px", height: "300px" }}>
        <List style={{ marginTop: "50px", marginLeft: "50px" }}>
          <List.Item style={{ marginBottom: "15px" }}>
            <p>First Name:</p> {firstName}
          </List.Item>
          <List.Item style={{ marginBottom: "15px" }}>
            <p>Last Name:</p>
            {lastName}
          </List.Item>
          <List.Item style={{ marginBottom: "15px" }}>
            <p>Birth Date:</p>
            {formatDate}
          </List.Item>
          <Button onClick={showDetails}>details</Button>
          {details ? (
            <List.Item
              style={{
                marginBottom: "15px",
                display: "flex",
                justifyContent: "flex-start",
                color: "secondary",
              }}
            >
              <p>{contactType}: </p>
              {contactOptions?.mobilePhone ? (
                <p>{contactOptions.mobilePhone}</p>
              ) : null}
              {contactOptions?.phone ? <p>{contactOptions.phone}</p> : null}
              {contactOptions?.email ? <p>{contactOptions.email}</p> : null}
              {contactOptions?.pager ? <p>{contactOptions.pager}</p> : null}
            </List.Item>
          ) : null}
        </List>
        <ContactModal
          contactList={contactList}
          id={id}
          firstName={firstName}
          lastName={lastName}
        />
        <Button
          style={{
            position: "absolute",
            width: "40px",
            marginLeft: "700px",
            marginTop: "20px",
            background: "none",
          }}
          onClick={() => deleteContactById(id)}
        >
          <Icon link name="trash" style={{ fontSize: "20px" }} />
        </Button>
        <Button
          style={favorites ? { backgroundColor: "red" } : { backgroundColor: "blue" }}
          onClick={handleFavorites(id)}
        >
          <Rating />
        </Button>
      </Card>
    </Grid>
  );
};

export default ContactCardForm;
