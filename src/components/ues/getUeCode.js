import GetDetails from './getDetails';
import React from 'react';
import ShowDetails from './showDetails';
import { useParams } from 'react-router-dom';

export default function GetUeCode(props) {
    const params = useParams(); 
    console.log(params.code);
    return (
        <GetDetails code={params.code}/>
        //<ShowDetails code={params.code}/>
    )
}