import { Col, Collapse, Divider, Row, Tag, Space } from "antd";
import React from "react";

const { Panel } = Collapse;
export default function ListRubrique(props) {
  return (
    <Collapse accordion>
      {props.rubriques.map((item, index) => (
        <Panel
          style={{ justifyItems: "center" }}
          header={<Tag color="cyan">{item.designation}</Tag>}
          key={item.idRubrique}
          extra={<Tag color="blue">{item.ordre}</Tag>}
        >
          {item.questions.map((question) => (
            <div key={question.idQuestion}>
              <Row style={{ fontSize: "15px", fontWeight: "normal" }}>
                <Col span={16}>{question.intitule}</Col>
                <Col span={4}>
                  <Tag
                    style={{ width: "8em", textAlign: "center" }}
                    color="red"
                  >
                    {question.qualificatif.maximal}
                  </Tag>
                </Col>
                <Col span={4}>
                  <Tag
                    style={{ width: "8em", textAlign: "center" }}
                    color="green"
                  >
                    {question.qualificatif.minimal}
                  </Tag>
                </Col>
                <Divider />
              </Row>
            </div>
          ))}
        </Panel>
      ))}
    </Collapse>
  );
}
