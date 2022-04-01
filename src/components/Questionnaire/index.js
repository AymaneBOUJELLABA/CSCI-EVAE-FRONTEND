import { Button, Col, Row, Spin } from "antd";
import React, { useEffect, useReducer, useState } from "react";

import Steps from "./StepsLine";
import { getAllEvaluation } from "../../services/EvaluationService";
import { useLocation } from "react-router-dom";

const Questionnaire = () => {

  const {state} = useLocation();
  const [loading, setLoading] = useState(false);
  const [idle, setIdle] = useState(true);
  const [error, setError] = useState(null);
  const [evaluation, setEvaluation] = useState(state);

  console.log("evaluation " , evaluation);
  useEffect(() => 
  {
    setLoading(true);
    setIdle(false);
    if(evaluation.codeUe && evaluation)
    {
      setLoading(false);
      setIdle(false);
    }
  }, []);

  if (loading)
    return (
      <Spin
        style={{ position: "absolute", right: "46%", bottom: "42%" }}
        size="large"
      />
    );
  if (error !== null) return <h1>Error</h1>;
  if (idle) return <div />;
  return (
    <>
      <Steps {...{ evaluation}} />
    </>
  );
};

export default Questionnaire;
