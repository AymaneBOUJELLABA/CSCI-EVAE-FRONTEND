import "antd/dist/antd.css";

import {Alert, Col, Layout, Row, Space, Spin, Table, Tag} from "antd";
import React, { Component } from 'react'

import {
  FileSearchOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;
export default class ShowDetails extends Component {

  state={
    columns : [
      {
        title: () => <div style={{fontSize:"13px", fontWeight:"bolder"}}>Volume Horaire</div>,
        children: [
          {
            title: () => <div style={{fontSize:"12px", fontWeight:"bolder"}}>Cours</div>,
            dataIndex: 'cours',
            key: 'cours',
            width: 100,
          },
          {
            title: () => <div style={{fontSize:"12px", fontWeight:"bolder"}}>TD</div>,
            dataIndex: 'td',
            key: 'td',
            width: 100,
          },
          {
            title: () => <div style={{fontSize:"12px", fontWeight:"bolder"}}>TP</div>,
            dataIndex: 'tp',
            key: 'tp',
            width: 100,
          }
    ]
  }
],
table:[],
options:{
  method: 'GET',
  /*headers: {
    'Accept': 'application/json'   
  }*/
},
loading: false,
}

onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
}

componentDidMount= () => {
  fetch('http://localhost:8082/api/ue/'+this.props.code,this.state.options)
    .then(response =>  response.json())  
    .then(response => {
        console.log(response);
       // let i = 0;
        //response.map((elt)=>{
          //elt.key=i;
          //i++;
        //});
        //console.log(response);
        this.setState({data:response,table:[{
          key:0,
          cours: response.nbhCm,
          td: response.nbhTd,
          tp: response.nbhTp,
        }],loading:true});
        console.log(this.state.data);
        console.log(this.state.table);
    })
    .catch(err => console.error(err));
}
  render() {
    console.log(this.props);
    return (
     <div style={{ paddingTop: "30px", fontFamily:"Arial"}}>
     <Title level={5} style={{ paddingBottom: "10px", fontFamily:"Garamond"}}>
        <Space>
        <FileSearchOutlined />
          Détails
        </Space>
      </Title>
      { 
        !this.state.loading ?<div style={{textAlign:"center"}}><br /><Spin tip="Chargement..." size="large" /></div>  :
      <>
      <Row>
      <Col span={7} offset={3} style={{}}><Tag color="#55acee" style={{fontSize:"14.5px",fontWeight:"bold", }}> {this.state.data.designation} ({this.state.data.codeUe})</Tag></Col>
      <br/>
      <Col offset={9} style={{fontSize:"11.5px",fontWeight:"bolder"}}>
          <Tag color="#cd201f" >Semestre {this.state.data.semestre}</Tag>
      </Col>
      </Row>
      <br/><br/>
      <Row>
      <Col offset={16}>
        
        <div><Tag color="#3b5999" style={{fontSize:"11.5px", fontWeight:"bold"}}>enseigné par</Tag>  <span style={{fontSize:"12px", fontWeight:"bolder"}}> {this.state.data.prenomEnseignant ? this.state.data.prenomEnseignant.charAt(0).toUpperCase() +this.state.data.prenomEnseignant.slice(1).toLowerCase() : this.state.data.prenomEnseignant} </span>  <span style={{fontSize:"11px", fontWeight:"bolder"}}>{this.state.data.nomEnseigant.toUpperCase()}</span></div>
        <div style={{fontSize:"12px", fontWeight:"bolder", marginLeft:"100px"}}>{this.state.data.typeEnseignant}</div>
        <div style={{fontSize:"12px", fontWeight:"bolder", marginLeft:"100px"}}>{this.state.data.emailUbo}</div>
        <div style={{fontSize:"12px", fontWeight:"bolder", marginLeft:"100px"}}>{this.state.data.emailPerso}</div>
        <div style={{fontSize:"12px", fontWeight:"bolder", marginLeft:"100px"}}>{this.state.data.mobile}</div>  
        
      </Col>
    </Row>
    
     
    <Row>
      <Col offset={4}>
        <Table columns={this.state.columns} dataSource={this.state.table} onChange={this.onChange} pagination={false} 
        //style={{border:"1px solid black"}}
        />
      </Col>
    </Row>
    <br/> <br/>
    <Row>
      <Col offset={4} style={{fontSize:"13px", fontWeight:"bold"}}>{this.state.data.description? this.state.data.description
      
        :
          <Alert message={"Description de "+this.state.data.codeUe+ " :"} type="info" description="Aucune description disponible" />
    
    }</Col>
      </Row></>}
      </div>
    );
  }
}
