import 'antd/dist/antd.css';

import { Alert, Button, PageHeader } from "antd";
import { FileSearchOutlined, LineChartOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react'

import Chart from 'react-google-charts'
import { Spin } from 'antd';
import { getGraph } from '../../services/StatistiqueGraph';
import { useParams } from 'react-router-dom';

export default function StatistiqueGraphe() {

    const [r,setR]=useState([]);
    const [l, setL] = useState([]);
    const params = useParams();

    useEffect(()=>{
       
    const loadData = async () => {
      const response = await getGraph();
      setR(response);
     
      
    };
    loadData();

    const options = {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        }
    };
    
    fetch('http://localhost:8082/api/ue/list/M2DOSI', options)
        .then(response => response.json())
        .then(response => {
            setL(response);
                
        })
        .catch(err => console.error(err));

        
    },[])
    
    const LineData1=[];
    const x=[];
    x.push('x');
    const LineData = [
        ['x', 'COURS','TD','TP','PROJET','BILAN' ],
        ['2008-2009',2,4,6,3,2],
        ['2009-2010',4,6,8,2,9],
        ['2010-2011',6,null,12,10,7],
        ['2013-2012',8,13,12,14,8],
        
      ];
    const LineChartOptions = {
        hAxis: {
          title: 'les annee',
          format: 'YYYY-YYYY',
          slantedText:true,
          slantedTextAngle:45
        
        },
        
        vAxis: {
          title: 'moyen des rubrique',
        },
        series: {
          1: { curveType: 'function' },
        },
        curveType: 'function',
        pointSize: 7,
        }
        console.log(params.code)
        r.sort(function (a, b) {
            return a.anneUniv.substring(0,4) - b.anneUniv.substring(0,4);
          });
          
          
        r.map((obj) =>
            {
                    obj.reponseEvaluations.map((elem)=>{
                        elem.rubriques.map((rub)=>{
                        let j=0;
                        for(let i=0 ;i<x.length;i++){
                            if(rub.designation==x[i]){
                                j=1;
                            }
                        }
                        if(j==0){
                            x.push(rub.designation)
                        }
                        })       
                    })
            }
        );
        
        LineData1.push(x);
        r.map((obj) =>
        {
            if(obj.anneUniv!="2014-2015"){
                const arry=[];
                arry.push(obj.anneUniv)
                for(let i=1 ;i<x.length;i++){
                    let sum=0;
                    let j=0;
                    
                obj.reponseEvaluations.map((elem)=>{
                        
                        elem.rubriques.map((rub)=>{
                            if(x[i]==rub.designation){
                                sum+=rub.moyenne;
                                j++;
                            }    
                            
                        }) 
                        
                
                })
                if(sum==0 && j==0 ){
                    arry.push(null)
                }
                else{
                    arry.push(sum/j);
                }
                
                
            }
            
            LineData1.push(arry)
            }
        }
    );

    let e=0;
    r.map((obj) =>
        {
            if(obj.anneUniv=="2014-2015"){
                const arry=[];
                arry.push(obj.anneUniv)
                for(let i=1 ;i<x.length;i++){
                    let sum=0;
                    let j=0;
                obj.reponseEvaluations.map((elem)=>{
                    if(params.code==elem.codeUe){

                         elem.rubriques.map((rub)=>{
                            if(x[i]==rub.designation){
                                sum+=rub.moyenne;
                                j++;
                            }    
                            
                        })
                    }

                    else{
                        sum=-1;
                    }
                        
                        

                })
                if(sum==0 && j==0 ){
                    arry.push(null)
                }
                if(sum!=0 && j!=0 && sum!=-1){
                    arry.push(sum/j);
                }
                
                
            }
            if(arry.length!=1)
            LineData1.push(arry)

            if(arry.length==1){
                e=1;
            }
            }
        }
    );
    const t=e;
let q=0;

l.map((ue)=>{
    if(params.code==ue.codeUe){
        q=1
    }
})
if(q==0){
    return(
        <>
        <Link to="/">
              <Button type="primary">Page d'accueil</Button>
            </Link>
            <Alert
            message={"Page non trouvée"}
            description="Perdu ? Impossible de trouver la page"
             /> 
        </>
    )
}
if(x.length==1 ){
    return(
       
        <Spin
        style={{ position: "absolute", right: "40%", bottom: "50%" }}
        size="large"
      />
    )
}

const history = useHistory();
  return (
      <>
      <PageHeader onBack={() => history.push('/UniteEnseignements')} title={<span><LineChartOutlined />Historique</span>}
        subTitle={"Page du historique d'une unité d'enseignements" } 
          />
        <div className="container mt-5 " style={{textAlign:'center'}} >
            {t==0?<h2 >statistique graphe</h2>:<h2 >statistique pour { params.code } (il y a pas des statistique pour promotion 2014-2015 )</h2>}
            <Chart
            style={{margin:'0 auto', backgroundColor:'red'}}
            width={'750px'}
            height={'440px'}
            chartType="LineChart"
            loader={<Spin />}
            data={LineData1}
            options={LineChartOptions}
            rootProps={{ 'data-testid': '2' }}
            />
        </div>
      </>

    
  )
  
}
