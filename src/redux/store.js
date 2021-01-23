import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducers from "./rootReducers";
import { persistStore } from "redux-persist";

export const store = createStore(
  RootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
export const persistor = persistStore(store);

export default store;
