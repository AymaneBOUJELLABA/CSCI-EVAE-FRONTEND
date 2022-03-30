import { fontFamily } from "@mui/system";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Input,
  List,
  Modal,
  Row,
  Tag,
} from "antd";
import React, { useState } from "react";
import {
  ALERT_TYPES,
  QUESTIONNAIRE_SUCCESS_MESSAGES,
  onShowAlert,
} from "../../shared/constant";
import { envoyerQuestionnaire } from "../../services/QuestionnaireService";
import {
  RiEmotionUnhappyLine,
  RiEmotionSadLine,
  RiEmotionNormalLine,
  RiEmotionLine,
  RiEmotionLaughLine,
} from "react-icons/ri";

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

const Recaputilatif = (recap) => {
  console.log("recap :>> ", recap);
  const { Panel } = Collapse;
  const { TextArea } = Input;
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [state, setstate] = useState(recap.location.state);
  console.log("comment :>> ", comment);
  console.log("state12 :>> ", state);
  const handleSend = async () => {
    await envoyerQuestionnaire(recap);
  };
  return (
    <>
      <Row justify="center">
        <h1 style={{ margin: "10px" }}>Recaputilatif:</h1>
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

                  <Divider />
                </Row>
              </div>
            ))}
          </Panel>
        ))}
      </Collapse>
      <Divider />

      <Modal
        title="Laissez nous votre commentaire"
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
          }}
        >
          Valider
        </Button>
        <Button
          hidden={!disabled}
          onClick={() => {
            handleSend();
            console.log("state Envoyé :>> ", state);
            onShowAlert(
              QUESTIONNAIRE_SUCCESS_MESSAGES.ADDED,
              ALERT_TYPES.SUCCESS
            );
          }}
        >
          Envoyer
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
