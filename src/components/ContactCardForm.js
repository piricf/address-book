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
}) => {
  const deleteContact = () => {
    deleteContactHandler(id);
  };

  const formatDate = moment(birthDate).format("DD.MM.YYYY");
  console.log(formatDate);

  return (
    <Grid textAlign="center" style={{ height: "20vh" }} verticalAlign="middle">
      <Card
      // style={{ marginBottom: "50px", width: "80vh", boxShadow: "55px gray" }}
      >
        <List>
          <List.Item
            style={{
              margin: "40px 50px 50px 40px",
              fontSize: "30px",
            }}
          >
            {firstName}
          </List.Item>
          <List.Item
            style={{
              margin: "40px 50px 50px 40px",
              fontSize: "30px",
            }}
          >
            {lastName}
          </List.Item>
          <List.Item>{formatDate}</List.Item>
        </List>
        <Button
          style={{
            position: "absolute",
            width: "40px",
            marginLeft: "1100px",
            marginTop: "20px",
            background: "none",
          }}
          onClick={() => deleteContact(id)}
        >
          <Icon link name="trash" style={{ fontSize: "30px" }} />
        </Button>
      </Card>
    </Grid>
  );
};

export default ContactCardForm;
