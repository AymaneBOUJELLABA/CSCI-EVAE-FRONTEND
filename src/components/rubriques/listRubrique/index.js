import { Alert, Col, Collapse, Divider, Row, Tag } from "antd";

import React from "react";

const { Panel } = Collapse;
export default function ListRubrique(props) {
  return (
    <>
      <Collapse accordion>
        {props.rubriques.map((item, index) => (
          <Panel
            style={{ justifyItems: "center" }}
            header={
              <>
                <Tag>{item.ordre}</Tag>
                <Tag color="cyan">{item.designation}</Tag>
              </>
            }
            key={item.idRubrique}
          >
            {item.questions.length < 1 ? 
               <Alert showIcon type="info" description="Aucune question disponible pour cette rubrique" message=""/>
              :
              item.questions.map((question) => (
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
              ))
            } 
            
          </Panel>
        ))}
      </Collapse>
    </>
  );
}
