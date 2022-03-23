import { ALERT_TYPES, onShowAlert } from '../../shared/constant';
import { Alert, Button, Collapse,  Space, message } from 'antd';

import React, { useEffect, useState } from "react";
import { ajoutEvaluation, getEvaluationOfUe} from "./EvaluationSlice";

import AddEvaluation from './AddEvaluation';
import DragDropRubriques from '../ues/dragDropRubriques';
import InfoEvaluation from './InfoEvaluation';
import { getAllRubriques } from "../../services/RubriqueService";
import { useParams } from 'react-router';
import { getUeByCode } from '../../services/UeService';

const { Panel } = Collapse;

function callback(key) {
    console.log(key);
  }

  const initalEvalState = {designation:'',idEvaluation:-1, rubriques:[]}

export default function Popup (props)
{

    let {codeUe} = useParams();
    console.log("Code ue", codeUe);
    const [evaluation, setEvaluation] = useState(initalEvalState);
    const [toggleAdd, setToggleAdd] = useState(true)
    const [rubriques , setRubriques ] = useState([])
    const [rubriquesTitle, setRubriqueTitle ] = useState([])
    const [selectedTitle, setSelectedTitle] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [UeInfo, setUeInfo] = useState({});

    const handleChange = (value) =>
    { 
      setSelectedTitle(value);
    } 

    const addNewRubrique = (e) =>
    {

      if(selectedTitle.length < 1)
      {
        onShowAlert("Veuillez sélectionner une rubrique" , ALERT_TYPES.WARNING); 
      }else
      {
        let rub;
        rubriquesTitle.forEach((item,index) => {
          if(item.idRubrique === selectedTitle)
            rub = rubriquesTitle.splice(index,1)[0];
        })
        setRubriques(
          [
            ...rubriques,
            rub
          ])
        }
      
    }

    console.log("evaluation : ", evaluation)

    const onFinish = (values) =>
    {

      let dateD = Date.parse(values.debutReponse);
      let dateF = Date.parse(values.finReponse);

      if(Number(dateD) > Number(dateF))
      {
        onShowAlert("Veuillez choisir une date de fin supérieure à la date de début", ALERT_TYPES.WARNING);
      }
      else
      {
        values = {... values, rubriques}
        console.log("values to send", values)
        const fetchData = async (data) =>
        {
          
          const response = await ajoutEvaluation(data);
          console.log("server response ", response)
          setEvaluation(response);

          message.info("Ajout d'evaluation avec succès");
        }
        
        fetchData(values);
      }
    }

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    useEffect (() =>
    {
      const fetchUe =  async () => {
        const ue = await getUeByCode(codeUe);
        setUeInfo(ue);
        
      }
      const fetchData = async () =>
      {
        const response = await getAllRubriques(); 
        setRubriqueTitle(response);
        
        const initalEvaluation = await getEvaluationOfUe(codeUe);

        setEvaluation(initalEvaluation || initalEvalState);
      }
      fetchUe();
      fetchData();

      return () => {
        setEvaluation(initalEvalState)
      }
    
    }, []);
    console.log("UeInfo ", UeInfo)
    const initialValues = {
      idEvaluation: null,
      noEnseignant: Number(UeInfo.noEnseignant),
      codeFormation: "M2DOSI", 
      anneeUniversitaire: "2014-2015",
      codeUe: UeInfo.codeUe,
      codeEc: null,
      noEvaluation: 3,
      designation: "Evaluation "+UeInfo.codeUe,
      etat: "ELA",
      periode: "",
      debutReponse: "",
      finReponse: ""
    }

    const handleDelete = (id) =>
    {
      let rub;
      rubriques.forEach((item,index) => {
        if(item.idRubrique===id)
          rub = rubriques.splice(index,1);
      })

      setRubriqueTitle([
        ...rubriquesTitle,
        rub[0]
      ])
    }

  
    let isExist = false;
    let content;
    if(evaluation.idEvaluation > -1)
      isExist = true

    if(isExist)
    {
      content = isUpdate? 
        <DragDropRubriques onAnnuler={()=>setIsUpdate(false)} evaluation={evaluation} closeUpdate={()=>setIsUpdate(false)}/>
          : 
        <InfoEvaluation evaluation={evaluation} ue={UeInfo} callback={callback}/>
    }else
    {
      
      content = toggleAdd ? 
        <Space direction='vertical' size={'large'}>
          <Alert message="Aucune Evaluation n'est disponible" description={"Veuillez Ajouter une Nouvelle Evaluation pour l'UE "+UeInfo.codeUe}  showIcon type="info"/>
          <Button 
                type="primary" 
                shape="round" 
                size= 'large'
                className="addButton"
                onClick = {() => setToggleAdd(false)}
                    >
            Ajouter
          </Button>
      </Space>
      :
      <AddEvaluation
        initialValues = {initialValues}
        onFinish = {onFinish} 
        onFinishFailed = {onFinishFailed}
        handleChange = {handleChange}
        handleDelete = {handleDelete}
        rubriquesTitle = {rubriquesTitle}
        addNewRubrique = {addNewRubrique}
        rubriques = {rubriques}
        selectedValue = {selectedTitle}
      />

    }
      const handleCancel = () =>
    {
      //setOpenPopup(false);
      setIsUpdate(false);
      setToggleAdd(true);
      setEvaluation(initalEvalState);
    };

    return (
      <>
            <div style={{overflow:'auto'}}>
            {content}
            </div>  
            {isExist&& !isUpdate &&
              <Button style={{marginTop:15}} type="primary" onClick={()=>setIsUpdate(true)}>
                        Modifier Rubriques
              </Button>
            }
    </>
    )

  
}