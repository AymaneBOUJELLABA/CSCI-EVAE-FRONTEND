import "./style.css";

import {
  ArrowRightOutlined,
  CheckOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Rate,
  Row,
  Space,
  Steps,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useReducer, useState } from "react";
import {
  RiEmotionLaughLine,
  RiEmotionLine,
  RiEmotionNormalLine,
  RiEmotionSadLine,
  RiEmotionUnhappyLine,
} from "react-icons/ri";
import { find, get, isNil, uniqBy } from "lodash";

import Question from "./Question";
import { useAuth } from "../../context/auth";

const { Step } = Steps;

const reducer = (state, action) => {
  switch (action.type) {
    case "changeStep":
      return {
        ...state,
        rubriques: uniqBy(
          [
            ...state.rubriques,
            {
              idRubrique: action.idRubrique,
              designation: action.designation,
              questions: [],
            },
          ],
          "idRubrique"
        ),
      };

    case "newResponse":
      return {
        ...state,
        rubriques: [
          ...state.rubriques.map((el) => {
            if (el.idRubrique === action.idRubrique) {
              return {
                ...el,
                questions: el.questions.map((e) => {
                  if (e.idQuestion === action.response.idQuestion) {
                    return {
                      ...e,
                      reponse: action.response.reponse,
                    };
                  }
                  return e;
                }),
              };
            }
            return el;
          }),
        ],
      };
    default:
      throw new Error();
  }
};

const columns = [
  {
    title: <RiEmotionUnhappyLine className="emot-tab" color="red" />,
    dataIndex: "emot1",
    key: "emot1",
  },
  {
    title: <RiEmotionSadLine className="emot-tab" color="#aeae00" />,
    dataIndex: "emot2",
    key: "emot2",
    responsive: ["md"],
  },
  {
    title: <RiEmotionNormalLine className="emot-tab" color="orange" />,
    dataIndex: "emot3",
    key: "emot3",
    responsive: ["lg"],
  },
  {
    title: <RiEmotionLine className="emot-tab" color="blue" />,
    dataIndex: "emot4",
    key: "emot4",
    responsive: ["lg"],
  },
  {
    title: <RiEmotionLaughLine className="emot-tab" color="green" />,
    dataIndex: "emot5",
    key: "emot5",
    responsive: ["lg"],
  },
];
const data = [
  {
    key: "1",
    emot1: <Tag color={"red"}>1/5</Tag>,
    emot2: <Tag color={"yellow"}>2/5</Tag>,
    emot3: <Tag color={"orange"}>3/5</Tag>,
    emot4: <Tag color={"blue"}>4/5</Tag>,
    emot5: <Tag color={"green"}>5/5</Tag>,
  },
];
const StepsLine = ({ evaluation = {} }) => {
  console.log("evaluation :>> ", evaluation);

  const etudiant = useAuth();
  const navigate = useNavigate();
  console.log("user:  ", etudiant);
  const initialState = {
    idEvaluation: evaluation.idEvaluation,
    idEtudiant: etudiant.noEtudiant,
    commentaire: "",
    rubriques: evaluation.rubriques.map(
      ({ idRubrique, designation, questions }) => ({
        idRubrique,
        designation,
        questions: questions.map((e) => ({
          ...e,
          reponse: 0,
        })),
      })
    ),
  };

  const onChangeStep = ({ idRubrique, designation }) =>
    dispatch({ type: "changeStep", idRubrique, designation });

  const [current, setCurrent] = useState(null);
  const onChangeCurrent = (current) => setCurrent(current);

  const [questions, setQuestions] = useState([]);
  const [infoRubrique, setInfoRubrique] = useState({});

  const [isButtonHidden, setButtonIsHidden] = useState(true);
  //state contient toutes les donnees
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state :>> ", state);

  const _onSetNewResponse = ({ response, idRubrique }) =>
    dispatch({ type: "newResponse", response, idRubrique });

  const onClickSuivant = (rubrique) => {
    console.log("rubrique :>> ", rubrique);
    onChangeStep({
      idRubrique: rubrique.idRubrique,
      designation: rubrique.designation,
    });
    setQuestions(rubrique.questions);
    setInfoRubrique({
      id: rubrique.idRubrique,
      designation: rubrique.designation,
    });
  };
  useEffect(() => {
    current &&
      onClickSuivant(find(state.rubriques, (_, index) => index === current));
  }, [current]);

  const element = state.rubriques.find(
    ({ idRubrique }) => idRubrique === infoRubrique.id
  );
  console.log("element :>> ", element);

  return (
    <>
      {!isNil(current) && (
        <div>
          <div
            style={{
              position: "fixed",
              width: "80%",
              zIndex: "10 ",
              background: "white",
              width: "86.268em",
              backgroundColor: "white",
              padding: "14px",
            }}
          >
            <Steps current={current} onChange={onChangeCurrent}>
              {state.rubriques.map((rubrique, index) => (
                <Step
                  disabled={true}
                  key={index}
                  title={rubrique.designation}
                />
              ))}
              <Step disabled={true} title="R??caputilatif" />
            </Steps>
          </div>
          <br />
          <Divider />
          <div id="topPage">
            <Question
              {...{
                questions: questions,
                idEvaluation: evaluation.idEvaluation,
                idRubrique: infoRubrique.id,
                designation: infoRubrique.designation,
                _onSetNewResponse,
              }}
            />
          </div>
          <Row justify="center">
            <Col>
              {current === state.rubriques.length - 1 ? (
                <Button
                  onClick={() =>
                    navigate("/recaputilatif", {
                      replace: true,
                      state: state,
                    })
                  }
                  hidden={isButtonHidden}
                >
                  <CheckOutlined /> Terminer
                </Button>
              ) : (
                <>
                  <Tooltip
                    title={
                      element && element.questions.some((e) => e.reponse === 0)
                        ? "Veuillez repondre ?? toutes les questions"
                        : "Passer ?? la rubrique suivante"
                    }
                    color={
                      element && element.questions.some((e) => e.reponse === 0)
                        ? "#f50"
                        : "#87d068"
                    }
                  >
                    <Button
                      hidden={isButtonHidden}
                      disabled={
                        element &&
                        element.questions.some((e) => e.reponse === 0)
                      }
                      onClick={() => {
                        onChangeCurrent(current + 1);
                      }}
                    >
                      <ArrowRightOutlined />
                      Suivant
                    </Button>
                  </Tooltip>
                </>
              )}
            </Col>
          </Row>
          <Divider />
        </div>
      )}
      <Card
        hidden={!isButtonHidden}
        justify="center"
        title={`${evaluation.designation} ${evaluation.anneeUniversitaire}`}
      >
        <Card type="inner" title="Instructions">
          <ol>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <li>
                L'??valuation est sous la forme d'un ensemble d'??tapes. Chaque
                ??tape repr??sente une rubrique qui contient des questions.
              </li>

              <li>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ display: "flex" }}
                >
                  <div>
                    Pour r??pondre ?? une question , vous avez le choix entre{" "}
                    <strong>5 ??motic??nes</strong>. Chaque ??motic??ne repr??sente
                    une valeur de <strong>1</strong> ?? <strong>5</strong> :
                  </div>
                  <Row>
                    <Col offset={4}>
                      <Table
                        bordered={true}
                        columns={columns}
                        dataSource={data}
                        style={{ width: "max-content" }}
                        pagination={false}
                      />
                    </Col>
                  </Row>
                </Space>
              </li>
              <li>
                Vous avez ?? la fin de chaque rubrique (??tape) un bouton
                <strong>"Suivant"</strong> qui vous permettra de passer ?? la
                rubrique suivante.
                <ul style={{ color: "#ea0b0b" }}>
                  <strong>PS:</strong> Vous devez imp??rativement r??pondre ??
                  toutes les questions pour passer ?? la rubrique suivante.
                </ul>
              </li>
              <li>
                Quand vous allez terminer l'??valuation, vous pouvez consulter un
                r??capitulatif de toutes vos r??ponses, ensuite veuillez valider
                vos r??ponses en cliquant sur le bouton{" "}
                <strong>"Valider"</strong>
              </li>
              <li>
                Nous vous prions de bien vouloir nous laisser un commentaire ou
                votre avis sur le d??roulement de cette ??valuation dans le champs
                du texte appropri?? avant que vous envoyez votre r??ponse finale.
              </li>
              <li>
                Cliquez sur le bouton <strong>"Commencer"</strong> pour
                commencer l'??valuation.
              </li>
            </Space>
          </ol>
        </Card>
        <Row justify="center">
          <Button
            onClick={() => {
              onChangeStep({
                idRubrique: get(evaluation, "rubriques[0].idRubrique"),
                designation: get(evaluation, "rubriques[0].designation"),
              });
              setQuestions(get(evaluation, "rubriques[0].questions"));
              setInfoRubrique({
                id: get(evaluation, "rubriques[0].idRubrique"),
                designation: get(evaluation, "rubriques[0].designation"),
              });
              setButtonIsHidden(false);
              setCurrent(0);
            }}
          >
            <PlayCircleOutlined />
            Commencer
          </Button>
        </Row>
      </Card>
      ,
    </>
  );
};

export default StepsLine;
