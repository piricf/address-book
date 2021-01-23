import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginFormView from "./views/LoginFormView";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
          <Switch>
            <Route path="/" exact component={LoginFormView} />
          </Switch>
        </PersistGate>
      </Router>
    </Provider>
  );
};

export default App;
