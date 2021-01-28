import { combineReducers } from "redux";
import { userReducer } from "./auth/userReducer";
import { contactReducer } from "./contacts/contactReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer", "contactReducer"],
};

const rootReducers = combineReducers({
  userReducer: userReducer,
  contactReducer: contactReducer,
});

export default persistReducer(persistConfig, rootReducers);
