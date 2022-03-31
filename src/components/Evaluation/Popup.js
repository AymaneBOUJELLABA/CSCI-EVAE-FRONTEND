import { ALERT_TYPES, onShowAlert } from "../../shared/constant";
import { Alert, Button, Collapse, PageHeader, Space, message } from "antd";
import { FileTextOutlined, PlusOutlined, ShareAltOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { ajoutEvaluation, getEvaluationOfUe, publierEvaluation } from "./EvaluationSlice";
import { Link, useHistory } from "react-router-dom";
import AddEvaluation from "./AddEvaluation";
import DragDropRubriques from "../ues/dragDropRubriques";
import InfoEvaluation from "./InfoEvaluation";
import { getAllRubriques } from "../../services/RubriqueService";
import { getUeByCode } from "../../services/UeService";
import { useParams } from "react-router";

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const initalEvalState = { designation: "", idEvaluation: -1, rubriques: [] };


export default function Popup(props) {
  let { codeUe } = useParams();
  // console.log("Code ue", codeUe);
  const [evaluation, setEvaluation] = useState(initalEvalState);
  const [toggleAdd, setToggleAdd] = useState(true);
  const [rubriques, setRubriques] = useState([]);
  const [rubriquesTitle, setRubriqueTitle] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [UeInfo, setUeInfo] = useState({});
  const history = useHistory();
  const  [disabled , setDisabled ] = useState("true") ;


  const handleCancel = () => {
    //setOpenPopup(false);
    setIsUpdate(false);
    setToggleAdd(true);
  };
  const handleChange = (value) => {
    setSelectedTitle(value);
  };

  const addNewRubrique = (e) => {
    if (selectedTitle.length < 1) {
      onShowAlert("Veuillez sélectionner une rubrique", ALERT_TYPES.WARNING);
    } else {
      let rub;
      rubriquesTitle.forEach((item, index) => {
        if (item.idRubrique === selectedTitle)
          rub = rubriquesTitle.splice(index, 1)[0];
      });
      setRubriques([...rubriques, rub]);
      console.table(rub);
    }
  };

  // console.log("evaluation : ", evaluation);

  const onFinish = (values) => {
    const pvalues = {
      debutReponse: values["reponse"][0].format("YYYY-MM-DD"),
      finReponse: values["reponse"][1].format("YYYY-MM-DD"),
      periode:
        "Du " +
        values["period"][0].format("DD") +
        " " +
        values["period"][0].format("MMMM") +
        " au " +
        values["period"][1].format("DD") +
        " " +
        values["period"][1].format("MMMM"),
    };
    //console.log("range", Date.parse(values.range[0]));
    {
      values = {
        ...values,
        debutReponse: pvalues.debutReponse,
        finReponse: pvalues.finReponse,
        periode: pvalues.periode,
      };
      delete values.reponse;
      delete values.period;
      console.log("values to send", values);
      const fetchData = async (data) => {
        const response = await ajoutEvaluation(data);
        console.log("server response ", response);
        setEvaluation(response);

        message.info("Ajout d'evaluation avec succès");
      };
      console.table(values);
      console.table(pvalues);
      fetchData(values);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const fetchUe = async () => {
      const ue = await getUeByCode(codeUe);
      setUeInfo(ue);
      console.table(ue);
    };
    const fetchData = async () => {
      const response = await getAllRubriques();
      setRubriqueTitle(response);
      console.table(response);

      const initalEvaluation = await getEvaluationOfUe(codeUe);

      setEvaluation(initalEvaluation || initalEvalState);
    };
    fetchUe();
    fetchData();
    return () => {
      setEvaluation(initalEvalState);
    };
  }, []);
  console.table(UeInfo);
  const initialValues = {
    idEvaluation: null,
    noEnseignant: Number(UeInfo.noEnseignant),
    codeFormation: "M2DOSI",
    anneeUniversitaire: "2014-2015",
    codeUe: UeInfo.codeUe,
    codeEc: null,
    noEvaluation: 3,
    designation: "Evaluation " + UeInfo.codeUe,//props.ue.codeUe
    etat: "ELA",
    periode: "",
    debutReponse: "",
    finReponse: "",
    rubriquess: [],
    nomEnseignant: UeInfo.nomEnseigant,
    prenomEnseignant: UeInfo.prenomEnseignant,
  };

  /*
   Publication d'une évaluation
   */
  const publishEvaluation = async (idEval) => {
    if(isExist && evaluation.etat==="ELA") {
        const response = await publierEvaluation(idEval);
        console.log("server response ", response);
        setEvaluation(response);

        message.info("Publication de lévaluation avec succès");
      };
  }

  const handleDelete = (id) => {
    let rub;
    rubriques.forEach((item, index) => {
      if (item.idRubrique === id) rub = rubriques.splice(index, 1);
    });

    setRubriqueTitle([...rubriquesTitle, rub[0]]);
  };

  let isExist = false;
  let content;
  if (evaluation.idEvaluation > -1) isExist = true;

  if (isExist) {
    content = isUpdate ? (
      <DragDropRubriques evaluation={evaluation} handleCancel={handleCancel}/>
    ) : (
      <InfoEvaluation evaluation={evaluation} ue={UeInfo} callback={callback} />
    );
  } else {
    content = toggleAdd ? (
      <Space direction="vertical" size={"large"}>
        <Alert
          message={
            "Aucune évaluation n'a été encore ajoutée à l'unité d'enseignement " +
            UeInfo.designation +
            " (" +
            UeInfo.codeUe +
            ")"
          }
          description={"Vous pouvez y ajouter une!"}
          showIcon
          type="info"
        />
        <br />

        <Button
          type="primary"
          shape="round"
          size="large"
          className="addButton"
          icon={<PlusOutlined />}
          onClick={() => setToggleAdd(false)}
        >
          Ajouter une évaluation
        </Button>
      </Space>
    ) : (
      <AddEvaluation
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        handleChange={handleChange}
        handleDelete={handleDelete}
        rubriquesTitle={rubriquesTitle}
        addNewRubrique={addNewRubrique}
        rubriques={rubriques}
        selectedValue={selectedTitle}
      />
    );
  }
  return (
    <>
      <PageHeader onBack={() => history.goBack()}
                  title={
                      <span>
                        <FileTextOutlined />
                        Évaluation
                      </span>
                  }
        subTitle={"Page de l'évaluation de l'unité d'enseignement ( " +codeUe + " )" }
                    extra = {
                      <Button
                      type="primary"
                      shape="round"
                      size="large"
                      className="addButton"
                      icon={<ShareAltOutlined/>}
                      style={{
                        visibility: evaluation.etat==="ELA" ? 'visible' : 'hidden'
                      }}
                      onClick={() => publishEvaluation(evaluation.idEvaluation)}
                      >
                        Publier
                      </Button>
      }
      />
      <div style={{ overflow: "auto" }}>{content}</div>
      {isExist && !isUpdate && (
        <Button
          style={{ marginTop: 10, marginLeft : 425 }}
          type="primary"
          onClick={() => setIsUpdate(true)}
        >
          Modifier Rubriques
        </Button>
      )}
    </>
  );
}
