import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Rubriques from "./component/Rubriques/index";
import AddRubriques from "./component/AddRubrique";
import Layout from "./FichiersPartages/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={AddRubriques} path="/rubriques/add" exact/>
        <Route component={Rubriques} path="/rubriques"/>
      </Switch>
    </BrowserRouter>
  );
};

export default Layout(App);
