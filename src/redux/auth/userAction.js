import { FirebaseAuth } from "../../firebase/FirebaseConfig";

export const createUser = (email, password) => {
  return (dispatch) => {
    FirebaseAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({ type: "CREATE_USER", payload: user });
      })
      .catch((error) => {
        dispatch({ type: "ERROR", payload: error.message });
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    FirebaseAuth.signOut()
      .then(() => dispatch({ type: "LOGOUT_USER" }))
      .catch((error) => dispatch({ type: "ERROR", payload: error.message }));
  };
};
