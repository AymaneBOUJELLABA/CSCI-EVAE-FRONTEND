import React, { useEffect, useState, useReducer } from "react";
import { getAllEvaluation } from "../../services/EvaluationService";
import { Button, Col, Row, Spin } from "antd";
import Steps from "./StepsLine";
const Questionnaire = () => {
  const [evaluation, setEvaluation] = useState({});
  const [loading, setLoading] = useState(false);
  const [idle, setIdle] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setIdle(false);
    const loadData = async () => {
      const response = await getAllEvaluation();
      setEvaluation(response);
      setIdle(false);
      setError(response.status ? response : null);
      setLoading(false);
    };
    loadData();
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
      <Steps {...{ evaluation }} />
    </>
  );
};

export default Questionnaire;
