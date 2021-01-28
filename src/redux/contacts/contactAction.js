import { FirebaseDatabe } from "../../firebase/FirebaseConfig";

export const createContact = (contact) => {
  let newContact = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    contactOption: {
      contactType: contact.contactOptionSelected,
      contactTypeValue: contact.contactOptionValue,
    },
  };
  console.log(newContact);
  return (dispatch) => {
    FirebaseDatabe.ref("/users/" + contact.userUid + "/contacts")
      .push()
      .set(newContact)
      .then((contact) => dispatch({ type: "CREATE_CONTACT", payload: contact }))
      .catch((error) => dispatch({ type: "ERROR", payload: error }));
  };
};
