import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Rubriques from "./component/rubriques/index";
import AddRubriques from "./component/AddRubrique";
import Layout from "./PagePartager/layout";

const App = () => {
  return (
      <Layout>
        <Switch>
          <Route component={AddRubriques} path="/rubriques/add" exact/>
          <Route component={Rubriques} path="/rubriques"/>
        </Switch>
      </Layout>
  );
};

export default App;
