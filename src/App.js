import { BrowserRouter, Route, Switch } from "react-router-dom";

import AddRubrique from "./components/rubriques/AddRubrique";
import DragTest from "./components/test/dragTest";
import Error from "./shared/Error";
import Home from "./components/home";
import Layout from "./shared/layout";
import React from "react";
import Rubriques from "./components/rubriques";
import TestComponent from "./components/test/testComponent";

const App = () => {
  return (
      <Layout>
        <Switch>
          {/** ADD YOUR COMPONENT ROUTES HERE! */}
          <Route component={Rubriques} path="/ues" exact/>
          <Route component={AddRubrique} path="/rubriques/add"  exact/>
          <Route component={Rubriques} path="/rubriques" exact/>
          <Route component={TestComponent} path="/test" exact/>
          <Route component={Home} path="/" exact/>
          <Route component={Error} path="*"/>
        </Switch>
      </Layout>
  );
};

export default App;
