import { FirebaseAuth } from "../../firebase/FirebaseConfig";

export const createUser = (email, password) => {
  return (dispatch) => {
    FirebaseAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({ type: "CREATE_USER", payload: user });
      })
      .catch((error) => {
        dispatch({ type: "ERROR", payload: error.message });
      });
  };
};
