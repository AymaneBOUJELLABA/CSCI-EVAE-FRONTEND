import { Steps, Divider, Row, Col, Tag, Rate, Button, Card } from "antd";
import { find, get, isNil, uniqBy } from "lodash";
import React, { useReducer, useState, useEffect } from "react";

import {
  PlayCircleOutlined,
  ArrowRightOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import Question from "./Question";
import "./style.css";
import { Link } from "react-router-dom";

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

const StepsLine = ({ evaluation = {} }) => {
  const initialState = {
    idEvaluation: evaluation.idEvaluation,
    idEtudiant: null,
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

  const [isStepDisabeld, setStepIsDisabeld] = useState(false);
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
                  //onClick={() => onClickSuivant(rubrique)}
                />
              ))}
              <Step
                disabled={true}
                title="Récaputilatif"
                //onClick={() => onClickSuivant(rubrique)}
              />
            </Steps>
          </div>
          <br />
          <Divider />
          <div>
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
            {/*     <Button
                hidden={isButtonHidden}
                disabled={
                  element && element.questions.some((e) => e.reponse === 0)
                }
                onClick={() => {
                  onChangeCurrent(current + 1);
                }}
              >
                {current === state.rubriques.length - 1 ? (
                  <>Terminer</>
                ) : (
                  <>Suivant</>
                )}
              </Button> */}
            <Col>
              {current === state.rubriques.length - 1 ? (
                <Link
                  to={{
                    pathname: "/recaputilatif",
                    state: state,
                  }}
                >
                  <Button hidden={isButtonHidden} /* onClick={() => {}} */>
                    <CheckOutlined /> Terminer
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    hidden={isButtonHidden}
                    disabled={
                      element && element.questions.some((e) => e.reponse === 0)
                    }
                    onClick={() => {
                      onChangeCurrent(current + 1);
                    }}
                  >
                    <ArrowRightOutlined />
                    Suivant
                  </Button>
                  {/* <Button
                    hidden={isButtonHidden}
                    disabled={false}
                    onClick={() => {
                      onChangeCurrent(current - 1);
                    }}
                  >
                    <ArrowRightOutlined />
                    Precedant
                  </Button> */}
                </>
              )}
            </Col>
          </Row>
          <Divider />
        </div>
      )}
      <Card hidden={!isButtonHidden} justify="center" title="Questionnaire ">
        <Card type="inner" title="Instructions">
          <ol>
            <li>Instruction 1</li>
            <li>Instruction 2</li>
            <li>Instruction 3</li>
            <li>Instruction 4</li>
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
