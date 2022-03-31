import { Alert, Button, Card, Col, Divider, PageHeader, Result, Row, Space, Spin, Table, Tag, Typography } from 'antd';
import { FileSearchOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getAverageUnswer, getEvaluationOfUe, getStudentsNumber, getStudentsUnswerNumber } from '../Evaluation/EvaluationSlice';

const calculerMoyEtudUE = (response,codeUe) => {
  let avg = 0;
  let n = 0;
  if(response.length>1)
  {
      response.forEach((promo) =>
      {
          if(promo.codeFormation === "M2DOSI" && promo.anneUniv==="2014-2015")
          {
            promo.reponseEvaluations.forEach(repEval =>
            {
              if(repEval.codeUe === codeUe)
              {
                let somme = 0;
                repEval.rubriques.forEach((rub) =>
                {
                    somme+= rub.moyenne;
                });
                console.log("somme of rub : " , somme)
                const l = repEval.rubriques.length;
                avg +=  l> 0 ? (somme/l) : 0;
                console.log("average of repEval" , avg);  
                n++;
              }
            });
          }
      });
  }

  console.log("n :", n);
  console.log("avg : ", avg);
  avg = avg/n;
  return avg.toFixed(2);
}
export default function DetailsUe({columns,table,loading,data})
{
  const history = useHistory();
  const { Text } = Typography;
  const [ studentsNumber, setStudentsNumber ] = useState();
  const [ studentsUnswerNumber , setStudentsUnswerNumber ] = useState();
  const [evaluation, setEvaluation] = useState();
  const { Title } = Typography;
  const [ average , setAverage ] = useState();

  
  useEffect(() => 
  {
    if(data && data.codeUe)
    {
      const fetchEval = async () =>
      {
        const response = await getEvaluationOfUe(data.codeUe);
        setEvaluation(response);
      }
      fetchEval();
    }
    
  },[data]);

  useEffect(()=>
  {
    if(evaluation && evaluation.codeFormation)
    {
      const fetchData = async () =>
      {
        const etdNum = await getStudentsNumber(evaluation.codeFormation, evaluation.anneeUniversitaire);
        setStudentsNumber(etdNum);
      }

      const fetchUnsNumb = async() => {
        const etdUnsNum = await getStudentsUnswerNumber(evaluation.idEvaluation);
        setStudentsUnswerNumber(etdUnsNum);
      } 
      const fetchAverage = async() =>
      {
        const AverageResponse = await getAverageUnswer();
        setAverage(calculerMoyEtudUE(AverageResponse,evaluation.codeUe));
      }
      fetchData();
      fetchUnsNumb();
      fetchAverage();
    }
  
  },[evaluation])

  console.log("students answer : ", studentsUnswerNumber);

  
  let EnseignantInfo;
  
  if(!loading)
    return <Card loading />
  else
  {
    EnseignantInfo = {
      nom : data.nomEnseigant,
      pernom : data.prenomEnseignant,
      emailUbo : data.emailUbo,
      mobile: data.mobile
    }

    //    data.description = "Description du unité d'enseignemants";
  }
  
  if(data && Object.keys(data).length === 0 && Object.getPrototypeOf(data) === Object.prototype)
  {
    return <Result
    status="404"
    title="404"
    subTitle="Oops! Page introuvable ou Code UE invalide!"
    extra={<><Link to="/">
            <Button type="primary">Page d'accueil</Button>
          </Link>
          <Link to='/UniteEnseignements'>
            <Button type="primary">List des unités d'enseignemants</Button>
          </Link></>}
  />
  }

  return (
    <>
    <PageHeader onBack={() => history.goBack()} title={<span><FileSearchOutlined />Détails</span>}
        subTitle={"Page de détails d'une unité d'enseignements" } 
          />
    <div className='details-ue'>
      <Card loading={!loading} title={<span>{data.designation + ' ( ' + data.codeUe + ' )'}<Tag style={{float:'right'}} color="magenta">Semestre 9</Tag></span>}>
        <Row justify='space-between'>
          <Col span={16}>
            <Card title="Volume Horaire" type='inner'>
              <Table size='middle' columns={columns} dataSource={table} pagination={false} />  
            </Card>
          </Col>
          <Col span={6}>
            <Card title={"Enseigné par "+ EnseignantInfo.nom + ' '+EnseignantInfo.pernom} type='inner'>
              {
                Object.entries(EnseignantInfo).map(([key,item],idx)=>{
                  
                  return ( 
                    idx > 1 ?
                    <>
                    {key==="mobile" ? <PhoneOutlined /> : <MailOutlined />}              
                    <span>{' '+item}</span><br/>
                    </> : ''
                    )
                }
              )}

            </Card>
     
          </Col>  
        </Row>
        <Row justify='space-between'>
          <Col style={{marginTop:40}} span={16}>
                {!data.description ?
                  <Alert message={"Déscription de "+data.codeUe+ " :"} type="info" description="Aucune description disponible" />
                  :
                  <Card type="inner" title={"Déscription de l'UE : " + data.codeUe}>
                    {data.description}
                  </Card>
                }
          </Col>
      
        </Row>
        <Divider style={{ marginTop : 60, marginBottom : 20}} />

                <Title level={3}> Plus de détails sur l'Évaluation </Title>
        <Row>
        <Col style={{marginTop:40}} span ={6} offset={6}>
            <Card title={"Historique "} type='inner' >
              <Space direction="vertical">
             
              <Button type="primary" onClick={() => console.log("this button shows graphes ! ")}>Historique (Graphe)</Button>
              </Space>
            </Card>
          </Col>

          {evaluation && evaluation.codeFormation &&
          <Col style={{marginTop:40}} span ={6} offset={6}>
            <Card title='Évaluation' type='inner' >
              <Space direction="vertical">
              <Text > Élève : {studentsUnswerNumber? studentsUnswerNumber+'/'+studentsNumber: <Spin />}  </Text>
              <Text > Moyenne de l'évaluation : { average } </Text>
              <Button type="primary" onClick={() => console.log("this button shows statistics !")}>Statistique </Button>
              </Space>
            </Card>
          </Col>
          }
        </Row>
      </Card>
    </div>
    </>
  )
}
