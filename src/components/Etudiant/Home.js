import { Alert, Button, Card, Col, Row, Space, Spin, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getAllEvaluation,
  getAllEvaluationsPublished,
} from "../../services/EvaluationService";

import Item from "antd/lib/list/Item";
import Questionnaire from "../Questionnaire";
import { useAuth } from "../../context/auth";

const EtudiantHome = () => {
  const nameOfStudent = "amiNe";
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idle, setIdle] = useState(true);
  const [error, setError] = useState(null);

  const auth = useAuth();
  const [isHidden, setIsHidden] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    setIdle(false);
    const loadData = async () => {
      const response = await getAllEvaluationsPublished();
      setEvaluations(response);
      setIdle(false);
      setError(response.status ? response : null);
      setLoading(false);
    };
    loadData();
  }, []);

  console.log("evaluations", evaluations);
  if (loading)
    return (
      <Spin
        style={{ position: "absolute", right: "46%", bottom: "42%" }}
        size="large"
      />
    );
  if (error !== null) return <h1>Error</h1>;
  if (idle) return <div />;

  if (evaluations.length < 1) {
    return (
      <Spin
        style={{ position: "absolute", right: "46%", bottom: "42%" }}
        size="large"
        tip="Chargement des données..."
      />
    );
  }
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
        title={`Évaluations ${evaluations[0].anneeUniversitaire}`}
      >
        <Card type="inner" title="À propos des évaluations">
          <div hidden={isHidden}>
            <p>
              Nous avons créé cette plateforme pour vous, chers étudiants, afin
              d'améliorer notre formation pour les prochaines promotions. Pour
              cela, nous avons besoin de votre contribution en passant ces
              évaluations qui ne prendront que quelques minutes de votre temps.
            </p>
            <p>
              Pour afficher toutes les évaluations disponibles, veuillez cliquer
              sur le bouton<strong>"Liste des évaluations"</strong>
            </p>
          </div>
          <div hidden={!isHidden}>
            <p>Liste des évaluations disponibles :</p>

            {evaluations.length >= 1 ? (
              evaluations.map((evaluation, idx) => (
                <Row>
                  <Space>
                    <Col>{evaluation.designation}</Col>

                    <Col>
                      <Button
                        onClick={() =>
                          navigate("/questionnaire", {
                            replace: true,
                            state: evaluation,
                          })
                        }
                      >
                        Évaluer l'UE {evaluation.codeUe}
                      </Button>
                    </Col>
                  </Space>
                </Row>
              ))
            ) : (
              <Table></Table>
            )}
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
