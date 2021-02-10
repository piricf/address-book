import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Pagination, Icon, Button } from "semantic-ui-react";
import { getAllContacts, updateContact } from "../redux/contacts/contactAction";
import ContactCardForm from "./ContactCardForm";
import "semantic-ui-css/semantic.min.css";

const AddressBookForm = () => {
  const dispatch = useDispatch();
  const userUid = useSelector((state) => state.userReducer.user.user.uid);
  const contacts = useSelector((state) => state.contactReducer.contact);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [contactList, setContactList] = useState(contacts);

  const sortByLastName = () => {
    const sorted = [...contactList].sort((a, b) =>
      a.lastName > b.lastName ? 1 : -1
    );
    setContactList(sorted);
  };
  const sortByLastNameDown = () => {
    const sorted = [...contactList].sort((a, b) =>
      a.lastName < b.lastName ? 1 : -1
    );
    setContactList(sorted);
  };

  const handleFavorites = (id) => {
    const selectedContact = contactList.find((contact) => contact.id === id);
    selectedContact.favorites = !selectedContact.favorites;

    dispatch(updateContact(userUid, selectedContact, id));
  };

  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);

  useEffect(() => {
    dispatch(getAllContacts(userUid));
  }, [dispatch, userUid]);

  const onPageChange = (e, data) => {
    const { activePage } = data;
    setPage(activePage);
  };

  const handlePageSizeChange = ({ target }) => {
    const { value } = target;
    setPageSize(value);
  };

  const paginateContacts = contactList.slice(
    pageSize * (page - 1),
    pageSize * (page - 1) + pageSize
  );

  return (
    <div>
      <Header textAlign="center" style={{ height: "5vh" }}>
        Adresar!
      </Header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "100px",
        }}
      >
        <Button
          style={{ background: "none", fontSize: "20px" }}
          onClick={sortByLastName}
        >
          <Icon name="sort alphabet down"></Icon>
        </Button>
        <Button
          style={{ background: "none", fontSize: "20px" }}
          onClick={sortByLastNameDown}
        >
          <Icon name="sort alphabet up"></Icon>
        </Button>
        <select
          style={{
            height: "25px",
            marginTop: "10px",
            borderRadius: "8px",
          }}
          value={pageSize}
          name="contactOptions"
          id="contactOptions"
          placeholder="Select type of contact"
          onChange={handlePageSizeChange}
        >
          <option value="" selected hidden>
            Choose page size
          </option>

          <option value="15" id="15">
            15
          </option>
          <option value="30" id="30">
            30
          </option>
          <option value="45" id="45">
            45
          </option>
        </select>{" "}
      </div>
      <div>
        {paginateContacts &&
          paginateContacts.map((contact, i) => (
            <ContactCardForm
              key={i}
              contactList={contactList}
              birthDate={contact?.birthDate}
              firstName={contact?.firstName}
              lastName={contact?.lastName}
              contactOptions={contact?.contactOptions}
              contactType={contact?.contactType}
              userUid={userUid}
              id={contact?.id}
              favorites={contact?.favorites}
              handleFavorites={handleFavorites}
            />
          ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          activePage={page}
          onPageChange={onPageChange}
          totalPages={10}
        />
      </div>
    </div>
  );
};

export default AddressBookForm;
