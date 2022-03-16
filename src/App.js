import { Route, Switch } from "react-router-dom";

import Error from "./shared/Error";
import Home from "./components/home";
import Layout from "./shared/layout";
import React from "react";
import Rubriques from "./components/rubriques";

const App = () => {
  return (
      <Layout>
        <Switch>
          {/** ADD YOUR COMPONENT ROUTES HERE! */}
          <Route component={Rubriques} path="/ues" exact/>
          <Route component={Rubriques} path="/rubriques" exact/>
          <Route component={Home} path="/" exact/>
          <Route component={() => <Error status="Not found" message="You lost ? Cannot find Page"/> } path="*"/>
        </Switch>
      </Layout>
  );
};

export default App;
