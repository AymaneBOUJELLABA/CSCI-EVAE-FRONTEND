/*
import { getResultatEvaluationById } from './EvaluationSlice';

import React from 'react'

const {Panel} = Collapse


export default function DetailResultatEvaluation()

 { 
    const url = "http://localhost:8082/api/"; 
    const response = await fetch(url + "evaluations/statEval/"+id,
    {
        method:'GET'
    });

    const getResultatEvaluationById = async(id)  =>
{
    try
    {
        const id =1;
        console.log("fetch id"+id);
        const response = await fetch(url + "evaluations/statEval/"+id,
        {
            method:'GET'
        });
        

        const json = await response.json();
        console.log(json);
        return json; 
    }catch(e)
    {
        console.error(e);
    }    
}
    console.log(getResultatEvaluationById );  
  return (
      
    
    <div style = {{height :300 , width: '100%'}}>
        <h3>Rubriques de l'UE </h3>
        <Collapse >
        {
        
        response .rubriques.map((rubrique) =>
            {
            return (
            <Panel header={rubrique.designation} key={rubrique.idRubrique} style={{fontSize: '15px', fontWeight : "bold"}} >
                {
                rubrique.questions.length < 1 ? 
                    <Alert showIcon type="info" description="Aucune question disponible pour cette rubrique" message=""/>
                :
                rubrique.questions.map((ques)=>{
                    return (
                    <div key={ques.idQuestion}>
                        <Row style={{fontSize: '15px', fontWeight : "normal"}}>
                        <Col span={16}  >
                            {ques.intitule}
                        </Col>
                        <Col span={4}>
                            <Tag style={{width:'8em',textAlign:"center"}} color="red" >{ques.qualificatif.maximal}</Tag>
                        </Col>
                        <Col span={4}>
                            <Tag style={{width:'8em',textAlign:"center"}} color="red" >{ques.nbrPos1}</Tag>
                        </Col>
                        <Col span={4}>
                            <Tag style={{width:'8em',textAlign:"center"}} color="red" >{ques.nbrPos2}</Tag>
                        </Col>
                        <Col span={4}>
                            <Tag style={{width:'8em',textAlign:"center"}} color="red" >{ques.nbrPos3}</Tag>
                        </Col>
                        <Col span={4}>
                            <Tag style={{width:'8em',textAlign:"center"}} color="red" >{ques.nbrPos4}</Tag>
                        </Col>
                        <Col span={4}>
                            <Tag style={{width:'8em',textAlign:"center"}} color="red" >{ques.nbrPos5}</Tag>
                        </Col>
                        <Col span={4}>
                            <Tag style={{width:'8em',textAlign:"center"}} color="green" >{ques.qualificatif.minimal}</Tag>
                        </Col>
                        <Divider />
                        </Row>
                    </div>
                )})}
            </Panel>   
            )})
        }
    </Collapse>
    </div>  
  )

  
}

*/

