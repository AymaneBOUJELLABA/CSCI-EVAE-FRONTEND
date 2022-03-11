import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Rubrique from "./component/rubriques";
import TestComponent from "./component/test/testComponent";
import Layout from "./FichiersPartages/Layout";

const App = () => {
  return (
    <TestComponent />
  );
};

export default Layout(App);
