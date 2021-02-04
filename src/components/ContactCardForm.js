import React from "react";
import { Card, List, Grid, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
const ContactCardForm = ({
  firstName,
  lastName,
  deleteContactHandler,
  id,
  birthDate,
  contactOptions,
  contactType,
}) => {
  const deleteContact = () => {
    deleteContactHandler(id);
  };

  console.log(contactOptions);
  const formatDate = moment(birthDate).format("DD.MM.YYYY");
  console.log(formatDate);

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
          <List.Item style={{ marginBottom: "15px" }}>
            <p>{contactType}: </p>
            {contactOptions.mobilePhone}
            {contactOptions.phone}
            {contactOptions.email}
            {contactOptions.pager}
          </List.Item>
        </List>
        <Button
          style={{
            position: "absolute",
            width: "40px",
            marginLeft: "700px",
            marginTop: "20px",
            background: "none",
          }}
          onClick={() => deleteContact(id)}
        >
          <Icon link name="trash" style={{ fontSize: "20px" }} />
        </Button>
      </Card>
    </Grid>
  );
};

export default ContactCardForm;
