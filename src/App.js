import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Rubriques from "./component/Rubriques";
import AddRubriques from "./component/AddRubrique";
import Layout from "./FichiersPartages/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Rubriques} path="/rubriques" exact />
        <Route component={AddRubriques} path="/rubriques/add" exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Layout(App);
