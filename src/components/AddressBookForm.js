import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Pagination } from "semantic-ui-react";
import { getAllContacts, deleteContact } from "../redux/contacts/contactAction";
import ContactCardForm from "./ContactCardForm";
import "semantic-ui-css/semantic.min.css";

const AddressBookForm = () => {
  const dispatch = useDispatch();

  const userUid = useSelector((state) => state.userReducer.user.user.uid);
  const contacts = useSelector((state) => state.contactReducer.contact);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  console.log("contact", contacts);

  useEffect(() => {
    dispatch(getAllContacts(userUid));
  }, [dispatch, userUid]);

  const deleteContactHandler = (userUid) => {
    dispatch(deleteContact(userUid));
  };

  const onPageChange = (e, data) => {
    const { activePage } = data;
    console.log(activePage);
    setPage(activePage);
  };

  const handlePageSizeChange = ({ target }) => {
    const { value } = target;
    setPageSize(value);
  };

  const paginateContacts = contacts.slice(
    pageSize * (page - 1),
    pageSize * (page - 1) + pageSize
  );

  console.log(paginateContacts, "owqkewqoewqoekqw");

  return (
    <div>
      <Header
        textAlign="center"
        style={{ height: "5vh" }}
        verticalAlign="middle"
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
        <option value="45">45</option>
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
            deleteContactHandler={deleteContactHandler}
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
    </div>
  );
};

export default AddressBookForm;
