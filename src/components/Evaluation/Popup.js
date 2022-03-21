import { ALERT_TYPES, onShowAlert } from '../../shared/constant';
import { Alert, Button, Card, Col, Collapse, DatePicker, Divider, Form, Input, Message, Modal, Row, Space, Tag, Typography, message } from 'antd';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from "react";
import { ajoutEvaluation, getEvalParId, getEvaluationOfUe, getUeDetails, getrubriques } from "./EvaluationSlice";

import AddEvaluation from './AddEvaluation';
import Container from '@material-ui/core/Container';
import DragDropRubriques from '../ues/dragDropRubriques';
import EditEvaluation from '../ues/editEvaluation';
import FormControl from '@mui/material/FormControl';
import InfoEvaluation from './InfoEvaluation';
import Item from "antd/lib/list/Item";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { getAllRubriques } from "../../services/RubriqueService";

const { Panel } = Collapse;

function callback(key) {
    console.log(key);
  }

  const initalEvalState = {designation:'',idEvaluation:-1, rubriques:[]}

export default function Popup (props)
{

    const { openPopup, setOpenPopup} = props;
    const [evaluation, setEvaluation] = useState(initalEvalState);
    const [toggleAdd, setToggleAdd] = useState(true)
    const [rubriques , setRubriques ] = useState([])
    const [rubriquesTitle, setRubriqueTitle ] = useState([])
    const [selectedTitle, setSelectedTitle] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);

    const initialValues = {
      idEvaluation: null,
      noEnseignant: Number(props.ue.noEnseignant),
      codeFormation: "M2DOSI", 
      anneeUniversitaire: "2014-2015",
      codeUe: props.ue.codeUe,
      codeEc: null,
      noEvaluation: 3,
      designation: "Evaluation "+props.ue.codeUe,
      etat: "ELA",
      periode: "",
      debutReponse: "",
      finReponse: ""
    }

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
      const fetchData = async () =>
      {
        const response = await getAllRubriques(); 
        setRubriqueTitle(response);
      
        const initalEvaluation = await getEvaluationOfUe(props.ue.codeUe);

        setEvaluation(initalEvaluation || initalEvalState);
      }
      fetchData();

      return () => {
        setEvaluation(initalEvalState)
      }
    
    }, [openPopup]);
    

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
        <InfoEvaluation evaluation={evaluation} ue={props.ue} callback={callback}/>
    }else
    {
      
      content = toggleAdd ? 
        <Space direction='vertical' size={'large'}>
          <Alert message="Aucune Evaluation n'est disponible" description={"Veuillez Ajouter une Nouvelle Evaluation pour l'UE "+props.ue.codeUe}  showIcon type="info"/>
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
      setOpenPopup(false);
      setIsUpdate(false);
      setToggleAdd(true);
      setEvaluation(initalEvalState);
    };

    return (
      <Modal title={isExist ? evaluation.designation : toggleAdd ? 'Évaluation de '+props.ue.codeUe : "Ajouter une nouvelle évaluation pour"+ props.ue.codeUe} 
          visible={openPopup} 
          afterClose={handleCancel}
          onCancel={handleCancel}
          footer={null} 
          width={700}>
            <div style={{overflow:'auto'}}>
            {content}
            </div>  
            {isExist&& !isUpdate &&
              <Button style={{marginTop:15}} type="primary" onClick={()=>setIsUpdate(true)}>
                        Modifier Rubriques
              </Button>
            }
      </Modal>
    )

   /* if (evaluation.idEvaluation > -1)
    {
        return (
            <Dialog open={openPopup} maxWidth="md" >
                <DialogTitle>
                         <div style={{ display : 'flex'}}> 
                         <Typography style={{ flexGrow : 1, padding:'10px',fontSize: '50px', fontWeight : "bold"}}>
                         {evaluation.designation}
                         </Typography>
                         <Button 
                         type="danger" 
                         shape="circle" 
                         size= 'small'
                         onClick={}>
                   X
                 </Button>
                 
                 </div>
                 <Button type="primary" onClick={()=>setIsUpdate(true)}>
                    Modifier Rubriques
                  </Button>
                </DialogTitle>
                <DialogContent dividers  style={{height:500, width:900}} >
                 
                 
                </DialogContent>
         
            </Dialog>)
    }else
    {
        if(toggleAdd)
        {
            return (
                <Dialog open={openPopup} maxWidth="md"  >
                    <DialogTitle>
                             <div style={{ display : 'flex'}}> 
                             <Typography style={{ flexGrow : 1, padding:'10px'}}>
                             {'Evaluation de '+ props.ue.codeUe}
                             </Typography>
                             <Button 
                             type="danger" 
                             shape="circle" 
                             size= 'small'
                             onClick={() => {{setOpenPopup(false)}; setToggleAdd(true);}}>
                       X
                     </Button>
                     </div>
                    </DialogTitle>
                    <DialogContent dividers style={{height:500, width:900}}>
                    
                    </DialogContent>
             
                      </Dialog>)
                }else {
                    return (
                        <Dialog open={openPopup} maxWidth="md"  >
                            <DialogTitle>
                                    <div style={{ display : 'flex'}}> 
                             <Typography style={{ flexGrow : 1, padding:'10px'}}>
                             Ajouter nouvelle Evaluation pour {props.ue.codeUe}
                             </Typography>
                         
                             <Button 
                             type="danger" 
                             shape="circle" 
                             size= 'small'
                             onClick={() => {{setOpenPopup(false);setToggleAdd(true);}}}>
                       X
                     </Button>
                     </div>
                    </DialogTitle>
                    <DialogContent dividers style={{height:700, width:900}}>
                        
                    </DialogContent>
                    
                </Dialog> )}}*/
}