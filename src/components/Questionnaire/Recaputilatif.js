import {
  ALERT_TYPES,
  QUESTIONNAIRE_SUCCESS_MESSAGES,
  onShowAlert,
} from "../../shared/constant";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Input,
  List,
  Modal,
  Rate,
  Row,
  Tag,
} from "antd";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  RiEmotionLaughLine,
  RiEmotionLine,
  RiEmotionNormalLine,
  RiEmotionSadLine,
  RiEmotionUnhappyLine,
} from "react-icons/ri";

import { envoyerQuestionnaire } from "../../services/QuestionnaireService";
import { fontFamily } from "@mui/system";

const customIcons = {
  1: <RiEmotionUnhappyLine fontSize={20} />,
  2: <RiEmotionSadLine fontSize={20} />,
  3: <RiEmotionNormalLine fontSize={20} />,
  4: <RiEmotionLine fontSize={20} />,
  5: <RiEmotionLaughLine fontSize={20} />,
};
const tagColor = {
  1: "red",
  2: "yellow",
  3: "orange",
  4: "blue",
  5: "green",
};

const Recaputilatif = () => {
  const location = useLocation();
  const recap = location.state;
  const { Panel } = Collapse;
  const { TextArea } = Input;
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [state, setstate] = useState(recap);
  const [response, setResponse] = useState({});
  const [done, setDone] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();
  /*console.log("comment :>> ", comment);
  console.log("state12 :>> ", state);*/


  const customIcons = {
    1: <RiEmotionUnhappyLine className="emote-unhappy" />,
    2: <RiEmotionSadLine className="emote-sad" />,
    3: <RiEmotionNormalLine className="emote-normal" />,
    4: <RiEmotionLine className="emote-happpy" />,
    5: <RiEmotionLaughLine className="emote-vey-hapy" />,
  };
  console.log("response : ", response);
  const handleSend = async () => {
    const sendData = async () => {
      console.log("...sending data...");
      const r = await envoyerQuestionnaire(state);
      setResponse(r);
      console.log("....data sent!");
      console.log(response);
      setDone(true);
    };
    await sendData();

    navigate("/home");
  };

  const changeValue = (idQuestion, idRub, reponse) => {
    let r = recap.location.state;

    r.rubriques.forEach((rub) => {
      if (rub.idRubrique === idRub) {
        rub.questions.forEach((q) => {
          if (q.idQuestion === idQuestion) {
            q.reponse = reponse;
          }
        });
      }
    });

    console.log("new state", r);
    setstate(r);
  };
  useEffect(() => {
    if (done) {
      if (response && response.data) {
        onShowAlert(QUESTIONNAIRE_SUCCESS_MESSAGES.ADDED, ALERT_TYPES.SUCCESS);
      } else if (response && response.error) {
        onShowAlert(QUESTIONNAIRE_SUCCESS_MESSAGES.FAILED, ALERT_TYPES.WARNING);
      }
      navigate("/home");
    }
    return () => {};
  }, [done]);

  return (
    <>
      <Row justify="center">
        <h1 style={{ margin: "10px" }}>Récapitulatif:</h1>
      </Row>
      <Collapse accordion defaultActiveKey={["1"]}>
        {state.rubriques.map((rubrique) => (
          <Panel
            style={{ justifyItems: "center" }}
            header={
              <>
                <Tag color="cyan">{rubrique.designation}</Tag>
              </>
            }
            key={rubrique.idRubrique}
          >
            {rubrique.questions.map((qst) => (
              <div key={qst.idQuestion}>
                <Row style={{ fontSize: "15px", fontWeight: "normal" }}>
                  <Col span={16}>{qst.intitule}</Col>
                  {isUpdate ? (
                    <Rate
                      character={({index}) => customIcons[index+1]}
                      defaultValue={qst.reponse}
                      onChange={(v) =>
                        changeValue(qst.idQuestion, rubrique.idRubrique, v)
                      }
                    />
                  ) : (
                    <>
                      <Col span={4}>
                        <Tag
                          style={{ width: "8em", textAlign: "center" }}
                          color={tagColor[qst.reponse]}
                        >
                          Note :{qst.reponse}/5
                        </Tag>
                      </Col>
                      <Col span={4}>
                        <Tag
                          style={{ width: "8em", textAlign: "center" }}
                          color={tagColor[qst.reponse]}
                        >
                          {customIcons[qst.reponse]}
                        </Tag>
                      </Col>
                    </>
                  )}

                  <Divider />
                </Row>
              </div>
            ))}
          </Panel>
        ))}
        {comment !== "" && (
          <Panel header={<Tag color="cyan">Commentaire</Tag>} key="12">
            {comment}
          </Panel>
        )}
      </Collapse>
      <Divider />

      <Modal
        title="Laissez-nous votre commentaire"
        visible={visible}
        onOk={() => {
          setstate({ ...state, commentaire: comment });
          setVisible(!visible);
          setDisabled(!disabled);
        }}
        onCancel={() => {
          setVisible(!visible);
        }}
      >
        <TextArea
          rows={4}
          placeholder="Commentaire"
          showCount
          maxLength={2500}
          style={{ height: 120, width: 470 }}
          onChange={(_) => setComment(_.target.value)}
          disabled={disabled}
        />
      </Modal>
      <Row justify="center">
        <Button
          disabled={disabled}
          hidden={disabled}
          onClick={() => {
            /* setstate({ ...state, commentaire: comment }); */
            setVisible(true);
            setIsUpdate(false);
          }}
        >
          Valider
        </Button>
        <Button
          hidden={!disabled}
          onClick={() => {
            handleSend();
          }}
        >
          Envoyer
        </Button>
        <Button
          type="primary"
          hidden={disabled || isUpdate}
          onClick={() => {
            /* setstate({ ...state, commentaire: comment }); */
            setIsUpdate(true);
          }}
        >
          Modifier
        </Button>
      </Row>
      <Divider />
    </>
  );
};

export default Recaputilatif;
// {
//   recap.location.state.rubriques.map((rubrique) => (
//     <List header={<Tag color={"red"}>{rubrique.designation} </Tag>}>
//       {rubrique.questions.map((qst) => (
//         <List.Item>
//           <Row>
//             <Col>{qst.intitule}</Col>
//             <Col>{qst.reponse}/5</Col>
//           </Row>
//         </List.Item>
//       ))}
//     </List>
//   ));
// }
