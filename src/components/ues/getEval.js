import React from 'react';
import { useParams } from 'react-router-dom';
import DragDropRubriques from './dragDropRubriques';

export default function GetEval(props) {
    const params = useParams(); 
    console.log(params.code);
     {/*<div>
         npm start
            Bla Bla {params.code}
        </div> */}
        /*
        
        componentDidMount= () => {
    fetch('/api/evaluations/rubriques',this.state.options)
      .then(response =>  response.json())  
      .then(response => {
          console.log(response);
          let i = 0;
          response.map((elt)=>{
            elt.key=i;
            i++;
          });
          console.log(response);
          this.setState({dataSource:response, loading: true});
      })
      .catch(err => console.error(err));
    }
        */
    return (
        <DragDropRubriques />
       
    )
}