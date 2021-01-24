import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../redux/auth/userAction";

const AddressBookView = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.userReducer);

  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <div>
      <h1>This is address book</h1>
    </div>
  );
};

export default AddressBookView;
