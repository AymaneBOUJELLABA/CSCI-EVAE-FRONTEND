import "./App.css";
import "antd/dist/antd.min.css";

import { Alert, Button, Result } from "antd";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import Error from "./shared/Error";
import EvaluationPage from "./components/Evaluation/EvaluationPage";
import GetEval from "./components/ues/getEval";
import GetRes from "./components/ues/getRes";
import GetUe from "./components/ues/getUe";
import GetUeCode from "./components/ues/getUeCode";
import Home from './components/home';
import Layout from './shared/layout';
import Popup from "./components/Evaluation/Popup";
import Questionnaire from "./components/Questionnaire";
import React from 'react';
import Recaputilatif from "./components/Questionnaire/Recaputilatif";
import Rubriques from './components/rubriques';
import ShowRes from "./components/Evaluation/ShowRes";
import StatistiqueGraphe from "./components/ues/StatistiqueGraphe";

export const App = () => {

  return (
      <Layout>
        <Switch>
          {/** ADD YOUR COMPONENT ROUTES HERE! */}
          <Route component={Rubriques} path="/rubriques" exact/>
          <Route component={Questionnaire} path="/questionnaire" exact />
          <Route component={Recaputilatif} path="/recaputilatif" exact />
          <Route exact path="/UniteEnseignement/Evaluation/:code" component={GetEval} />
          <Route exact path="/UniteEnseignement/:code" component={GetUeCode} />
          <Route exact path="/UniteEnseignements" component={GetUe} />
          <Route exact path="/UniteEnseignements/graphes/:code" component={StatistiqueGraphe} />
          <Route exact path="/Evaluation/popup/:codeUe" component={Popup} />
          <Route exact path="/resEval/:id"  component={ShowRes} />
          <Route component={Home} path="/" exact/>
          <Route render={()=>{
            return <>
            <Link to="/">
              <Button type="primary">Page d'accueil</Button>
            </Link>
            <Alert
            message={"Page non trouvée"}
            description="Perdu ? Impossible de trouver la page"
             /> 
            </>
          }} />
                    
        </Switch>
      </Layout>
  );
};

export default App;
