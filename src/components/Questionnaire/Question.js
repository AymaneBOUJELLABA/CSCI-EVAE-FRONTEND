import "./style.css";

import { Badge, Col, Divider, Rate, Row, Space, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  RiEmotionLaughLine,
  RiEmotionLine,
  RiEmotionNormalLine,
  RiEmotionSadLine,
  RiEmotionUnhappyLine,
} from "react-icons/ri";

const Question = (props) => {
  const status = (value) => {};
  const [recap, setRecap] = useState({
    idEvaluation: props.idEvaluation,
    idEtudiant: null,
    rubriques: [
      {
        idRubrique: props.idRubrique,
        designation: props.designation,
        questions: [],
      },
    ],
  });
  const [note, setNote] = useState(0);

  const starsColor = (value) => {
    if (value === 1) return "red";
    else if (value === 2) return "yellow";
    else if (value === 3) return "orange";
    else if (value === 4) return "blue";
    else if (value === 5) return "green";
    else return "grey";
  };
  const customIcons = {
    1: <RiEmotionUnhappyLine className="emote-unhappy" />,
    2: <RiEmotionSadLine className="emote-sad" />,
    3: <RiEmotionNormalLine className="emote-normal" />,
    4: <RiEmotionLine className="emote-happpy" />,
    5: <RiEmotionLaughLine className="emote-vey-hapy" />,
  };
  useEffect(() => {
    setRecap({
      ...recap,
      rubriques: recap.rubriques.map((e) => ({
        ...e,
        idRubrique: props.idRubrique,
        designation: props.designation,
      })),
    });
  }, [props.idRubrique]);

  const [isHidden, setHidden] = useState(false);

  const onSetNewResponse = (value, idQuestion, intitule, order) => {
    const response = {
      idQuestion: idQuestion,
      intitule: intitule,
      order: order,
      reponse: value,
    };
    props._onSetNewResponse({ response, idRubrique: props.idRubrique });
    setRecap({
      ...recap,
      rubriques: [
        ...recap.rubriques.map((e) => ({
          ...e,
          questions: [...e.questions, response],
        })),
      ],
    });
  };
  return (
    <>
      {props.questions.map((qst, index) => (
        <div key={`${qst.idQuestion}+${index}+${props.idRubrique}`}>
          <Row justify="center">
            <Col>{qst.intitule}</Col>
          </Row>
          <Row justify="center">
            <Col className="res-col" span={8}>
              <Tag className="res-tag" color="red">
                {qst.qualificatif.minimal}
              </Tag>
            </Col>
            <Col className="res-col" span={8}>
              <Rate
                key={`${qst.idQuestion}+${index}+${props.idRubrique}`}
                // show numbers instead of Start
                // character={({ index }) => index + 1}
                //show emojis insteed of stars
                character={({ index }) => customIcons[index + 1]}
                // key={props.questions.idQuestion}
                style={{ fontSize: "29px" }}
                /* onHoverChange={(value, index) => {
                  const color = starsColor(value);
                  setStarColor(color);
                }} */
                onChange={(value) => {
                  setNote(value);
                  onSetNewResponse(
                    value,
                    qst.idQuestion,
                    qst.intitule,
                    qst.order
                  );
                  setHidden(!isHidden);
                }}
              />
            </Col>
            <Col className="res-col" span={8}>
              <Tag className="res-tag" color="green">
                {qst.qualificatif.maximal}
              </Tag>
            </Col>
            {/* <Col span={4}>
              <Tag
                key={index  }
                style={{ width: "8em", textAlign: "center" }}
                color={tagColor[qst.reponse]}
              >
                Note :{note}/5
              </Tag>
            </Col> */}
          </Row>
          {/* <Row justify="center">
            <Space size={25}>
              <Badge color={"red"} />
              <Badge color={"#fca400cb"} />
              <Badge color={"#d6d600"} status={"default"} />
              <Badge status="processing" color={"#06d3b1"} />
              <Badge color={"#119e04"} />
            </Space>
          </Row> */}

          <Divider />
        </div>
      ))}
      {/* <Container>
        <Progress
          type="circle"
          style={{ position: "absolute", bottom: "194px", right: "-106px" }}
          percent={0}
        />
      </Container> */}
    </>
  );
};

export default Question;
