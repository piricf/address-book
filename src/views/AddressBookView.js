import React from "react";
import { useSelector } from "react-redux";

const AddressBookView = () => {
  const { user } = useSelector((state) => state.userReducer);
  console.log(user.uid);
  return (
    <div>
      <h1>This is address book</h1>
    </div>
  );
};

export default AddressBookView;
