import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import rootReducers from "./rootReducers";
import { composeWithDevTools } from "redux-devtools-extension";
// import persistStore from "redux-persist/es/persistStore";

export const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
// export const persistor = persistStore(store);

export default store;
