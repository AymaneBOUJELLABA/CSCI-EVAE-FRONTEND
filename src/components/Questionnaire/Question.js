import React, { useEffect, useState } from "react";
import { Divider, Row, Col, Tag, Rate } from "antd";
import "./style.css";

import {
  RiEmotionUnhappyLine,
  RiEmotionSadLine,
  RiEmotionNormalLine,
  RiEmotionLine,
  RiEmotionLaughLine,
} from "react-icons/ri";

const Question = (props) => {
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
                // show numbers instead of Start
                // character={({ index }) => index + 1}
                //show emojis insteed of stars
                character={({ index }) => customIcons[index + 1]}
                key={props.questions.idQuestion}
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
