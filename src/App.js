import "./App.css";
import "antd/dist/antd.css";

import { Alert, Button, Result } from "antd";
import { Route, Switch } from "react-router-dom";

import Error from "./shared/Error";
import EvaluationPage from "./components/Evaluation/EvaluationPage";
import GetEval from "./components/ues/getEval";
import GetUe from "./components/ues/getUe";
import GetUeCode from "./components/ues/getUeCode";
import Home from "./components/home";
import Layout from "./shared/layout";
import { Link } from "react-router-dom";
import React from "react";
import Rubriques from "./components/rubriques";
import Questionnaire from "./components/Questionnaire";
import Recaputilatif from "./components/Questionnaire/Recaputilatif";

export const App = () => {
  return (
    // {/* <Layout> */}
    <Switch>
      {/** ADD YOUR COMPONENT ROUTES HERE! */}
      <Route component={Rubriques} path="/rubriques" exact />
      <Route component={Questionnaire} path="/questionnaire" exact />
      <Route component={Recaputilatif} path="/recaputilatif" exact />
      <Route
        exact
        path="/UniteEnseignement/Evaluation/:code"
        component={GetEval}
      />
      <Route exact path="/UniteEnseignement/:code" component={GetUeCode} />
      <Route exact path="/UniteEnseignements" component={GetUe} />
      <Route component={Home} path="/" exact />
      <Route
        render={() => {
          return (
            <>
              <Link to="/">
                <Button type="primary">Page d'accueil</Button>
              </Link>
              <Alert
                message={"Page non trouvée"}
                description="Perdu ? Impossible de trouver la page"
              />
            </>
          );
        }}
      />
    </Switch>
    /*  </Layout> */
  );
};

export default App;
