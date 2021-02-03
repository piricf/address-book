import React from "react";
import { Card, List, Grid, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const ContactCardForm = ({ firstName, lastName, deleteContactHandler, id }) => {
  const deleteContact = () => {
    deleteContactHandler(id);
  };

  return (
    <Grid textAlign="center" style={{ height: "20vh" }} verticalAlign="middle">
      <Card
        style={{ marginBottom: "50px", width: "80vh", boxShadow: "55px gray" }}
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
