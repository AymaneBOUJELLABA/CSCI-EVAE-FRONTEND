import "./App.css";
import "antd/dist/antd.min.css";

import { Alert, Button, Result } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/auth";
import Error from "./shared/Error";
import EtudiantHome from "./components/Etudiant/Home";
import EvaluationPage from "./components/Evaluation/EvaluationPage";
import GetEval from "./components/ues/getEval";
import GetUe from "./components/ues/getUe";
import GetUeCode from "./components/ues/getUeCode";
import Home from "./components/home";
import Layout from "./shared/layout";
import { Link } from "react-router-dom";
import Login from "./components/Login/login";
import Popup from "./components/Evaluation/Popup";
import Questionnaire from "./components/Questionnaire";
import React from "react";
import Recaputilatif from "./components/Questionnaire/Recaputilatif";
import { RequireAuthADM } from "./context/requireAuthADM";
import { RequireAuthETU } from "./context/requireAuthETU";
import Rubriques from "./components/rubriques";
import ShowRes from "./components/Evaluation/ShowRes";
import StatistiqueGraphe from "./components/ues/StatistiqueGraphe";
import TestEtudiant from "./components/testEtudiant";
import { useAuth } from "./context/auth";

export const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {/** ADD YOUR COMPONENT ROUTES HERE! */}

          {/* public Switch */}
          <Route element={<Login />} path="/connexion" exact />

          {/* protected Switch */}
          <Route
            element={
              <RequireAuthADM>
                <Rubriques />
              </RequireAuthADM>
            }
            path="/rubriques"
            exact
          />
          
          <Route
            exact
            path="/resEval/:id"
            element={
              <RequireAuthADM>
                <ShowRes />
              </RequireAuthADM>
            }
          />
          <Route
            exact
            path="/UniteEnseignement/Evaluation/:code"
            element={
              <RequireAuthADM>
                <GetEval />
              </RequireAuthADM>
            }
          />
          <Route
            exact
            path="/UniteEnseignement/:code"
            element={
              <RequireAuthADM>
                <GetUeCode />
              </RequireAuthADM>
            }
          />
          <Route
            exact
            path="/UniteEnseignements/graphes/:code"
            element={
              <RequireAuthADM>
                <StatistiqueGraphe />
              </RequireAuthADM>
            }
          />

          <Route
            exact
            path="/UniteEnseignements"
            element={
              <RequireAuthADM>
                <GetUe />
              </RequireAuthADM>
            }
          />
          <Route
            exact
            path="/Evaluation/popup/:codeUe"
            element={
              <RequireAuthADM>
                <Popup />
              </RequireAuthADM>
            }
          />
          <Route
            element={
              <RequireAuthADM>
                <Home />
              </RequireAuthADM>
            }
            path="/"
            exact
          />

          {/** POUR TESTER HOME ETUDIANT */}
          <Route
            element={
              <RequireAuthETU>
                <EtudiantHome />
              </RequireAuthETU>
            }
            path="/home"
            exact
          />

          <Route
            element={
              <RequireAuthETU>
                <Questionnaire />
              </RequireAuthETU>
            }
            path="/questionnaire"
            exact
          />
          <Route
            element={
              <RequireAuthETU>
                <Recaputilatif />
              </RequireAuthETU>
            }
            path="/recaputilatif"
            exact
          />

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
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;
