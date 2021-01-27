import { FirebaseDatabe } from "../../firebase/FirebaseConfig";

export const createContact = (userId, contact) => {
  let newContact = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    date: new Date().toDateString(),
    // contactType: contact.contactType,
    // contactTypeValue: contact.contactTypeValue,
  };

  return (dispatch) => {
    FirebaseDatabe.ref("/user" + userId + "/contacts")
      .add(newContact)
      .then((contactRef) => {
        newContact.id = contactRef.id;
        dispatch({ type: "CREATE_CONTACT", payload: newContact });
      })
      .catch((error) => dispatch({ type: "ERROR", payload: error.message }));
  };
};
