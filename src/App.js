import React from "react";
import { Switch, Route } from "react-router-dom";

import rubrique from "./component/rubriques";
import Layout from "./PagePartager/layout";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route component={rubrique} path="/AjouterRubriques" exact />
      </Switch>
      </Layout>
  
  );
};

export default App;
