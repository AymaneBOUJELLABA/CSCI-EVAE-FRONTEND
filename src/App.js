import React from "react";
import { Switch, Route } from "react-router-dom";

import TestComponent from "./component/test/testComponent";
import Layout from "./PagePartager/layout";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route component={TestComponent} path="/AjouterRubriques" exact />
      </Switch>
      </Layout>
  
  );
};

export default App;
