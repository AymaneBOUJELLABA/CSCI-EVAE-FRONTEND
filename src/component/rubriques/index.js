import React, { useEffect, useState } from "react";
import { Row, Col, Collapse, Spin, Button, Tag, Divider } from "antd";
import "./style.css";
import { useHistory } from "react-router";
import ListRubrique from "./listRubrique";
import { Link } from "react-router-dom";

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
            <Link to="/rubriques/add">
              Ajouter Rubrique
            </Link>
          </div>

          <ListRubrique rubriques={rubriques} />
        </Col>
      </Row>
    </div>
  );
};

export default Rubriques;