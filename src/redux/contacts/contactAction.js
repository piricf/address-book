import { FirebaseDatabe } from "../../firebase/FirebaseConfig";

export const createContact = (contactData, userUid) => {
  console.log(contactData);
  return (dispatch) => {
    FirebaseDatabe.ref("/users/" + userUid + "/contacts")
      .push()
      .set(contactData)
      .then(() => dispatch({ type: "CREATE_CONTACT", payload: contactData }))
      .catch((error) => dispatch({ type: "ERROR", payload: error }));
  };
};

export const getAllContacts = (userUid) => {
  let allContacts = [];
  return (dispatch) => {
    FirebaseDatabe.ref("/users/" + userUid + "/contacts")
      .get()
      .then((snapshot) => {
        snapshot.forEach((child) => {
          allContacts.push({
            id: child.key,
            ...child.val(),
          });
        });
        dispatch({ type: "GET_CONTACTS", payload: allContacts });
      })
      .catch((error) => {
        dispatch({ type: "ERROR", payload: error.message });
      });
  };
};

export const deleteContact = (userUid, id) => {
  return (dispatch) => {
    FirebaseDatabe.ref("/users/" + userUid + "/contacts/")
      .child(`${id}`)
      .remove()
      .then(() => dispatch({ type: "DELETE_CONTACT" }))
      .catch((error) => dispatch({ type: "ERROR", payload: error.message }));
  };
};

export const updateContact = (userUid) => {
  let updatedContact = {
    firstName: "",
    lastName: "",
    birthDate: "",
    contactType: "",
    contactOptions: "",
  };
  return (dispatch) => {
    FirebaseDatabe.ref("/users/" + userUid + "/contacts/")
      .set({ updateContact })
      .then(() => dispatch({ type: "UPDATE_CONTACT", payload: updatedContact }))
      .catch((error) => dispatch({ type: "ERROR", payload: error.message }));
  };
};
