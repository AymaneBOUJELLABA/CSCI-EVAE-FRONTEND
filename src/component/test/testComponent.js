import React, { useEffect, useRef, useState} from 'react';
import InputRubrique from './inputRubrique';
import { Button, Col, Collapse, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const initialState = [
  {
    id:1,
    ordre : 1,
    nom : 'rubrique 1'
  },
  {
    id:2,
    ordre : 2,
    nom : 'rubrique 2'
  },
  {
    id:3,
    ordre : 3,
    nom : 'rubrique 3'
  }
]

export default function TestComponent()
{
  const { Panel } = Collapse;
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const [rubriques, setRubriques] = useState(initialState);
  const [currentAdd, setCurrentAdd] = useState('none');
  const [activekey,setActiveKey] = useState('0');

  rubriques.sort((a,b) => {return a.ordre- b.ordre;});

  const handleClick = (e) =>
  {
    setCurrentAdd(e.target.id);
    setActiveKey(e.target.key);
  }     

  const onFinish = (values) =>
  {
    let ordre = currentAdd==="first" ? 1: currentAdd.split('-')[1];

    let newArray = [...rubriques];

    for(let i = 0; i < newArray.length;i++)
    {
      if(newArray[i].ordre >= ordre)
        newArray[i].ordre++;
    }

    setRubriques([
      ...newArray,
      {
        id:rubriques[rubriques.length-1].id++,
        ordre : Number(ordre),
        nom : values.nomRubrique
      }
    ])
  };

  let key=1;
  return(
    <>
      <ul>
      {rubriques.map((item,index)=>(
          <div key={index}>
          <li>
            {item.nom+' '+item.id+'  ordre:'+item.ordre}
            <button id={'li-'+(item.ordre+1)} key={index} onClick={handleClick}>{'Add'+(item.ordre+1)}</button>
          </li>

          </div>
        ))}    
      </ul>


      <Button id="first" onClick={handleClick} type="primary" size="small" >add first</Button>
      <Row>
        <Col style={{display: 'flex',justifyContent: 'space-around',flexDirection: 'column'}}>
          {
            rubriques.map((item,index)=>(
              <button id={'li-'+(item.ordre+1)} key={index} onClick={handleClick}>{'Add'+(item.ordre+1)}</button>
            ))
          }
        </Col>
        <Col>
          <Collapse bordered>
            {currentAdd==="first"?
              <Panel key={key++} header="Ajouter premier rubrique">
                <InputRubrique onFinish={onFinish}/>
              </Panel>:''}
            {
              rubriques.map((item,index)=>
              (               
                <>
                  <Panel key={key++} header={item.nom+' '+item.id}>
                    {item.nom}
                  </Panel>

                  {currentAdd==="li-"+(item.ordre+1)?
                    <Panel key={key++} header={'Ajouter une rubrique dans la position ' + (item.ordre+1)}showArrow={false}>
                      <InputRubrique onFinish={onFinish}/>
                    </Panel> : ''}
                </>
              ))
            }
          </Collapse>
        </Col>
      </Row>
      
      
    </>
  );
} 
