import { Button, Space } from "antd";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import React from "react";

export default function Home() {
  const auth = useAuth();
  return (
    <>
      <h3>Page d'accueil</h3>
      {
        <Space
          direction="horizontal"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Link to="/rubriques">
            <Button type="primary" size="large">
              Liste des rubriques
            </Button>
          </Link>
          <Link to="/UniteEnseignements">
            <Button type="primary" size="large">
              Liste des unités d'enseignement
            </Button>
          </Link>
        </Space>
      }
    </>
  );
}
