import React, { useEffect, useState } from "react";
import { Row, Col, Collapse, Spin, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./style.css";
import { useHistory } from "react-router";

const { Panel } = Collapse;

const Rubriques = () => {
  const history = useHistory();
  const [rubriques, setRubriques] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8082/api/rubriques", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setRubriques(data);
        console.log("Success:", data);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  if (loading)
    return (
      <Spin
        style={{ position: "absolute", right: "46%", bottom: "42%" }}
        size="large"
      />
    );
  if (error) return <div>Erreur !</div>;

  return (
    <div className="container__antd p-top-20">
      <Row justify="space-between">
        <Col span={24}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Rubriques</h1>
            <Button onClick={() => history.push("/rubriques/add")}>
              Ajouter Rubrique
            </Button>
          </div>

          <Collapse accordion>
            {rubriques.map((item, index) => (
              <Panel
                style={{ justifyItems: "center" }}
                header={item.designation.replace(/�/g, "é")}
                key={item.idRubrique}
              >
                <ul>
                  {item.questions.map((question) => (
                    <li key={question.idQuestion}>
                      {" "}
                      {question.intitule.replace(/�/g, "é")}
                    </li>
                  ))}
                </ul>
              </Panel>
            ))}
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};

export default Rubriques;
