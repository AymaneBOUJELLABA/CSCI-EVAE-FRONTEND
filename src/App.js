import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Rubriques from "./component/rubriques";
import Layout from "./FichiersPartages/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Rubriques} path="/" exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Layout(App);
