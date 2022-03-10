import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Rubrique from "./component/rubriques";
import Layout from "./FichiersPartages/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Rubrique} path="/" exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Layout(App);
