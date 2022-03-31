import { Button, Card, Row, Space, Spin, Table } from "antd";

import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAllEvaluation } from "../../services/EvaluationService";

const EtudiantHome = () => {
  const nameOfStudent = "amiNe";
  const [evaluation, setEvaluation] = useState({});
  const [loading, setLoading] = useState(false);
  const [idle, setIdle] = useState(true);
  const [error, setError] = useState(null);
  const [listEvaluation, setListEvaluation] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

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
  console.log("evaluation12 :>> ", evaluation);
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
      <Row justify="center">
        <h1>
          Bienvenue{" "}
          {nameOfStudent.charAt(0).toUpperCase() +
            nameOfStudent.slice(1).toLowerCase()}{" "}
        </h1>
      </Row>

      <Card
        justify="center"
        title={`Évaluations ${evaluation.anneeUniversitaire}`}
      >
        <Card type="inner" title="À propos des évaluations">
          <div hidden={isHidden}>
            <p>
              Nous avons crée cette plateforme pour vous chers étudiants pour
              but d'ameliorer notre formation pour les promotions prochaines,
              pour cela nous avons besoin de votre contribution en passant ces
              évaluations qui prendront que quelques minutes de votre temps.
            </p>
            <p>
              Pour afficher tous les évaluations disponible cliquer sur{" "}
              <strong>Liste des évaluations</strong>{" "}
            </p>
          </div>
          <div hidden={!isHidden}>
            <p>Liste des évaluations disponible :</p>
            <Table></Table>
          </div>
          <Row justify="center">
            <Button
              hidden={isHidden}
              type="primary"
              size="large"
              onClick={() => setIsHidden(!isHidden)}
            >
              Liste des évaluations
            </Button>
          </Row>
        </Card>
      </Card>
    </>
  );
};

export default EtudiantHome;
