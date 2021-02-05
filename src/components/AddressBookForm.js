import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Pagination } from "semantic-ui-react";
import { getAllContacts } from "../redux/contacts/contactAction";
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
      <Header
        textAlign="center"
        style={{ height: "5vh" }}
        // verticalAlign="middle"
      >
        Your Address book!
      </Header>
      <select
        style={{
          marginLeft: "700px",
          marginBottom: "100px",
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
      <div>
        {paginateContacts?.map((contact, i) => (
          <ContactCardForm
            key={i}
            birthDate={contact?.birthDate}
            firstName={contact?.firstName}
            lastName={contact?.lastName}
            contactOptions={contact?.contactOptions}
            contactType={contact?.contactType}
            userUid={userUid}
            id={contact?.id}
          />
        ))}
      </div>
      <div>
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            width: "25%",
            marginLeft: "700px",
          }}
          activePage={page}
          onPageChange={onPageChange}
          totalPages={10}
        />
      </div>
      <div>
        <button onClick={sortByLastName}>up</button>
        <button onClick={sortByLastNameDown}>Down</button>
      </div>
    </div>
  );
};

export default AddressBookForm;
