import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Rubriques from "./component/rubriques/index";
import AddRubrique from "./component/AddRubrique";
import Layout from "./PagePartager/layout";

const App = () => {
  return (
      <Layout>
        <Switch>
          {/** ADD YOUR COMPONENT ROUTES HERE! */}
          <Route component={Rubriques} path="/ues" exact/>
          <Route component={AddRubrique} path="/rubriques/add" exact />
          <Route component={Rubriques} path="/rubriques" exact/>
        </Switch>
      </Layout>
  );
};

export default App;
