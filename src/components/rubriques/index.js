import "./style.css";

import { Button, Col, Collapse, Divider, Row, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";

import Error from '../../shared/Error';
import { Link } from "react-router-dom";
import ListRubrique from "./listRubrique";
import {getAllRubriques} from "../../services/RubriqueService"
import { useHistory } from "react-router";

const { Panel } = Collapse;

const Rubriques = () =>
{
  const history = useHistory();
  const [rubriques, setRubriques] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() =>
  {
    setLoading(true);
    const loadData = async () =>
    {
      const response = await getAllRubriques();
      console.log(response)
      setRubriques(response);
      setError(response.status?response:null);
      setLoading(false);  
    }
    loadData();
  }, []);

  if (loading)
    return (
      <Spin
        style={{ position: "absolute", right: "46%", bottom: "42%" }}
        size="large"
      />
    );
  if (error!==null) return <Error />;

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