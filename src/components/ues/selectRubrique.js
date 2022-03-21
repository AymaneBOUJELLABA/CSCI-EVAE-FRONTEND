import React, { Component } from 'react';

import {
    PlusSquareOutlined
} from '@ant-design/icons';
import { Select } from 'antd';

const { Option } = Select;


export default class SelectRubrique extends Component {

    state={
        rubriques:["A","B","C","D",],
        rubriquesBis:[],
        selected:""
    }

    componentDidMount= () => {
        fetch('http://localhost:8082/api/evaluations/rubriques',this.state.options)
          .then(response =>  response.json())  
          .then(response => {
             
              console.log(response);
              this.setState({rubriquesBis:response});
              this.state.rubriquesBis.map(elt1=>{
                this.props.dataBis.map(elt2=>{
                    if(elt1.designation==elt2.designation)
                    {
                        //this.state.rubriquesBis.de
                        var array = [...this.state.rubriquesBis]; // make a separate copy of the array
  var index = array.indexOf(elt1);
  console.log(index);
  if (index !== -1) {
    array.splice(index, 1);
    this.setState({rubriquesBis: array});
  }
                    }
                });
              });
             
             
          })
          .catch(err => console.error(err));
        }
    

    handleChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({selected:value});
      }

      handleClick = () => {
        console.log(this.state.selected);
      }

  render() {
    console.log("rubriquesBis");
    console.log(this.state.rubriquesBis.rubriques);
      console.log("rubriques");
      this.props ? console.log(this.props.dataBis) : console.log("nothing");
    return (
        <>
        <Select style={{ width: 120 }} onChange={this.handleChange}>
        { this.props &&
        this.state.rubriquesBis.map(rubrique=>
             <Option value={rubrique.designation}>{rubrique.designation}</Option>
        )
    }
         {/*<Option value="jack">Jack</Option> */} 
        </Select> &nbsp; &nbsp;
        <PlusSquareOutlined style={{ fontSize: '32px', color: '#08c' }} onClick={this.handleClick}/>
      </>
    )
  }
}
