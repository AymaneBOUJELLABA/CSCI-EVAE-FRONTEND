import React from "react";
import { Col, Collapse } from "antd";

import "./style.css";
const { Panel } = Collapse;
const List = ({ rubriques }) => (
  <Col span={24}>
    <h1>Rubriques</h1>
    <Collapse>
      {rubriques.map((item, index) => (
        <Panel style={{ justifyItems: "center" }} header={item} key={index}>
          <p>Questions</p>
        </Panel>
      ))}
    </Collapse>
  </Col>
);

export default List;
