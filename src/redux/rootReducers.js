import { combineReducers } from "redux";
import { userReducer } from "./auth/userReducer";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["userReducer"],
// };

const rootReducers = combineReducers({
  userReducer: userReducer,
});

export default rootReducers;
