import { Alert, Col, Collapse, Divider, Row, Tag } from 'antd'

import React from 'react'

const {Panel} = Collapse
export default function InfoEvaluation({evaluation, callback , ue})
{
  return (
    <div style = {{height :300 , width: '100%'}}>
        <h3>Les Rubriques de l'évaluation : </h3>
        <Collapse onChange={callback}>
        {
            evaluation.rubriques.map((rubrique) =>
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
