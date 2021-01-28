import { FirebaseDatabe } from "../../firebase/FirebaseConfig";

export const createContact = (contact) => {
  let newContact = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    BirthDate: contact.BirthDate,
    contactOption: {
      contactType: contact.contactOptionSelected,
      contactTypeValue: contact.contactOptionValue,
    },
  };
  return (dispatch) => {
    FirebaseDatabe.ref("/users/" + contact.userUid + "/contacts")
      .push()
      .set(newContact)
      .then((contact) => dispatch({ type: "CREATE_CONTACT", payload: contact }))
      .catch((error) => dispatch({ type: "ERROR", payload: error }));
  };
};
