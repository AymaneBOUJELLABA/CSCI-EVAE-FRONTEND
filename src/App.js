import "./App.css";
import "antd/dist/antd.min.css";


import { Alert, Button, Result } from "antd";
import { Route, Switch } from "react-router-dom";

import Error from './shared/Error';
import EvaluationPage from "./components/Evaluation/EvaluationPage";
import GetEval from "./components/ues/getEval"
import GetUe from "./components/ues/getUe";
import GetRes from "./components/ues/getRes";
import ShowRes from "./components/Evaluation/ShowRes"; 
import GetUeCode from "./components/ues/getUeCode";
import Home from './components/home';
import Layout from './shared/layout';
import { Link, BrowserRouter as Router} from "react-router-dom";
import React from 'react';
import Rubriques from './components/rubriques';

export const App = () => {
  return (
      <Layout>
        <Router>
        <Switch>
          {/** ADD YOUR COMPONENT ROUTES HERE! */}
          <Route component={Rubriques} path="/rubriques" exact/>
          <Route exact path="/UniteEnseignement/Evaluation/:code" component={GetEval} />
          <Route exact path="/UniteEnseignement/:code" component={GetUeCode} />
          <Route exact path="/UniteEnseignements" component={GetUe} />
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
        </Router>
      </Layout>
  );
};


export default App;

