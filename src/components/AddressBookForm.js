import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Pagination, Icon, Button } from "semantic-ui-react";
import { getAllContacts, updateContact } from "../redux/contacts/contactAction";
import ContactCardForm from "./ContactCardForm";
import "semantic-ui-css/semantic.min.css";
import { useHistory } from "react-router-dom";

const AddressBookForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userUid = useSelector((state) => state.userReducer?.user.user.uid);
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

  const handleFavorites = (id) => (e) => {
    const favoriteContacts = contactList.map((element) =>
      element.id === id
        ? { ...element, favorites: !element.favorites }
        : element
    );
    const findContact = contactList.find((element) => element.id === id);
    setContactList(favoriteContacts);
    dispatch(updateContact(userUid, findContact, id));
  };

  useEffect(() => {
    // if (!userUid) {
    //   history.push("/");
    // } else {
    dispatch(getAllContacts(userUid));
    //}
  }, [dispatch, userUid, history]);

  const onPageChange = (e, data) => {
    const { activePage } = data;
    setPage(activePage);
  };

  const handlePageSizeChange = ({ target }) => {
    const { value } = target;
    setPageSize(value);
  };

  console.log(contactList, "list");
  const paginateContacts = contactList.slice(
    pageSize * (page - 1),
    pageSize * (page - 1) + pageSize
  );

  return (
    <div>
      <Header textAlign="center" style={{ height: "5vh" }}>
        Your Address book!
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
          <Icon name="sort alphabet up"></Icon>
        </Button>
        <Button
          style={{ background: "none", fontSize: "20px" }}
          onClick={sortByLastNameDown}
        >
          <Icon name="sort alphabet down"></Icon>
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
      <div style={{ marginLeft: "1300px" }}>
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
