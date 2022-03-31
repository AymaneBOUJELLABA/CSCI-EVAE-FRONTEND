import React, { useState } from 'react';

import { Button } from 'antd';


export const EvaluationPage = (props) => 
{
  const [openPopup, setOpenPopup] = useState(false);
    return (
        <div>
        
        <h1 className="title"> Évaluation </h1>
        <Button 
        type="primary" 
        shape="round" 
        onClick={() => window.location.href="/Evaluation/popup"}  
        size= 'large'
        className="evaluationButton">
          Évaluation
        </Button>

        {/* <Popup 
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        >

        </Popup> */}
        
        </div>


    );
}

export default EvaluationPage;