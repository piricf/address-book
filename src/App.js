import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginFormView from "./views/LoginFormView";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";
import AddressBookView from "./views/AddressBookView";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={LoginFormView} />
          <Route path="/address-book" component={AddressBookView} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
