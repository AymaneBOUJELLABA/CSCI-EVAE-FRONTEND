import { BrowserRouter, Route, Switch } from "react-router-dom";

import AddRubrique from "./components/rubriques/AddRubrique";
import Layout from "./shared/layout";
import React from "react";
import Rubriques from "./components/rubriques";

const App = () => {
  return (
      <Layout>
        <Switch>
          {/** ADD YOUR COMPONENT ROUTES HERE! */}
          <Route component={Rubriques} path="/ues" exact/>
          <Route component={AddRubrique} path="/rubriques/add" exact />
          <Route component={Rubriques} path="/rubriques" exact/>
          <Route component={Rubriques} path="/"/>
        </Switch>
      </Layout>
  );
};

export default App;
