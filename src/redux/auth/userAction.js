import { FirebaseAuth } from "../../firebase/FirebaseConfig";

export const createUser = (email, password) => {
  return (dispatch) => {
    FirebaseAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user.user.uid);
        dispatch({ type: "CREATE_USER", payload: user });
      })
      .catch((error) => {
        dispatch({ type: "ERROR", payload: error.message });
      });
  };
};
