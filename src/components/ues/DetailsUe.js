import { Alert, Button, Card, Col, PageHeader, Result, Row, Table, Tag, Typography } from 'antd';
import { FileSearchOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

import React from 'react'

const {Title} = Typography;
export default function DetailsUe({columns,table,loading,data})
{
  const history = useHistory();
  let EnseignantInfo;
  
  if(!loading)
    return <Card loading />
  else
  {
    EnseignantInfo = {
      nom : data.nomEnseigant,
      prenom : data.prenomEnseignant,
      emailUbo : data.emailUbo,
      emailPerso : data.emailPerso,
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
        subTitle={"Page de détails d'une unité d'enseignements"}
          />
    <div className='details-ue'>
      <Card loading={!loading} title={<span><Title level={3} style={{display:'inline'}}>{data.designation + ' ( ' + data.codeUe + ' )'}</Title><Tag style={{float:'right', fontSize:'20px'}} color="magenta">Semestre {data.semestre}</Tag></span>}>
        <Row justify='space-between'>
          <Col span={16}>
            <Card title="Volume Horaire" type='inner'>
              <Table size='small' columns={columns} dataSource={table} pagination={false} />  
            </Card>
          </Col>
          <Col span={6}>
            <Card title={"Enseigné par "+ EnseignantInfo.nom + ' '+EnseignantInfo.prenom} type='inner'>
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
        <Row>
          <Col style={{marginTop:5}} span={16}>
                {!data.description ?
                  <Alert message={"Description de "+data.codeUe+ " :"} type="info" description="Aucune description disponible" />
                  :
                  <Card type="inner" title={"Description de l'UE : " + data.codeUe}>
                    {data.description}
                  </Card>
                }
          </Col>
        </Row>
      </Card>
    </div>
    </>
  )
}
