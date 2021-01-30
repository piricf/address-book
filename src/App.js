import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginFormView from "./views/LoginFormView";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import "./App.css";
import AddressBookView from "./views/AddressBookView";
import AddContactView from "./views/AddContactView";
import Navbar from "./components/Navbar";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={LoginFormView} />
            <Route path="/adresar" component={AddressBookView} />
            <Route path="/kontakti" component={AddContactView} />
          </Switch>
        </PersistGate>
      </Router>
    </Provider>
  );
};

export default App;
