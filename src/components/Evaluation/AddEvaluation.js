import { Button, Card, Col, Form, Input, Row, Select} from 'antd'
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons'

import React from 'react'

export default function AddEvaluation(
    {
        initialValues,
        onFinish, 
        onFinishFailed, 
        handleChange, 
        handleDelete,
        rubriquesTitle,
        addNewRubrique,
        rubriques,
        selectedValue
    })
{
  return (
    <Form 
    initialValues={initialValues}
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 20 }}
    autoComplete="off"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    > 
    <div style={{overflow:'auto'}}>

        <Form.Item
            label="N° Enseignant"
            name="noEnseignant" >
        <Input disabled={true} />
        </Form.Item>
        <Form.Item
            label="N° Evaluation"
            name="noEvaluation" >
        <Input disabled={true}/>
        </Form.Item>
        <Form.Item
            label="Code Formation"
            name="codeFormation"  >
        <Input disabled={true}/>
        </Form.Item>
        <Form.Item
            label="Code UE"
            name="codeUe">
        <Input disabled={true}/>
        </Form.Item>
        <Form.Item
            label="Code Element Constitutif"
            name="codeEc">
        <Input  disabled={true}/>
        </Form.Item>
            <Form.Item
                label="Année Universitaire"
                name="anneeUniversitaire"
            >
        <Input disabled={true} />
        </Form.Item>
        <Form.Item
            label="Désignation"
            name="designation"
            rules={[{ required: true, message: 'veuillez saisir le nom de l\'évaluation !' }]}
        >
        <Input />
        </Form.Item>
        <Form.Item
            label="État"
            name="etat"
        rules={[{ required: true, message: 'veuillez saisir l\'état !' }]}
        >
        <Input  />
        </Form.Item>
        <Form.Item 
        label="Période"
        name="periode"
        rules={[ { required: true, message: 'veuillez saisir la période !' }]}
        >
        <Input placeholder='Du jj mois au jj mois'/>
        </Form.Item>
        <Form.Item 
        label="Début Réponse"
        name="debutReponse"
        rules={[ { required: true, message: 'veuillez saisir la date du début de Réponse!' }]}
        >
            <Input type="date" /> 
        </Form.Item>
        <Form.Item 
        label="Fin Réponse"
        name="finReponse"
        rules= { [
            { required: true, message: 'veuillez saisir la date de fin de Réponse' }]}
        >
        <Input type="date" /> 
        
        </Form.Item>
        <Form.Item label="Rubrique" style={{width:800}}>
            <Row>
                <Col>
                    <Select style={{ width:300}} onChange={handleChange} value={selectedValue} placeholder="Sélectionner une rubrique">
                        {
                        rubriquesTitle.map((rubrique) => (
                            <Select.Option value={rubrique.idRubrique} key={rubrique.idRubrique} style={{ width :500 }}>
                            {rubrique.designation}
                            </Select.Option>
                        ))
                        }
                    </Select>
                </Col>
                <Col>
                    <Button onClick={addNewRubrique} icon={<PlusCircleTwoTone className='app-icon'/>} />  
                </Col>
            </Row>
        </Form.Item>
            {   
            rubriques.map((rub, index) => (
                <Card key={index} >
                    {rub.designation}
                    <Button 
                        icon={<MinusCircleTwoTone twoToneColor="#ff4d4f"/>}
                        onClick={()=>handleDelete(rub.idRubrique)}
                        style={{ marginLeft:"25px"}}/>
                </Card>
            ))
            }
            <Form.Item style={{paddingTop:15}} wrapperCol={{ offset: 8, span: 16 }}>
            <Button 
                    type="primary" 
                    shape="round" 
                    size= 'large'
                    htmlType="submit">
                Valider
            </Button>
            </Form.Item>
            </div>      
    </Form>
  )
}
