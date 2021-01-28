import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginFormView from "./views/LoginFormView";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";
import AddressBookView from "./views/AddressBookView";
import AddContactView from "./views/AddContactView";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={LoginFormView} />
          <Route path="/adresar" component={AddressBookView} />
          <Route path="/kontakti" component={AddContactView} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
