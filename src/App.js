import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Rubriques from "./component/addRubriques";
import ListRubrique from "./component/listRubrique";
import Layout from "./FichiersPartages/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Rubriques} path="/rubriques" exact={true} />
        <Route component={ListRubrique} path="/rubriques/create" exact={true} />
      </Switch>
    </BrowserRouter>
  );
};

export default Layout(App);
