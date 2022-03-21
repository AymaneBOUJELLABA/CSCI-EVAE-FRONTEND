import React, { useState } from 'react';

import { Button } from 'antd';
import Popup from './Popup';

export const EvaluationPage = (props) => 
{
  const [openPopup, setOpenPopup] = useState(false);
    return (
        <div>
        
        <h1 className="title"> Évaluation </h1>
        <Button 
        type="primary" 
        shape="round" 
        onClick={() => setOpenPopup(true)}  
        size= 'large'
        className="evaluationButton">
          Évaluation
        </Button>

        <Popup 
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        >

        </Popup>
        
        </div>


    );
}

export default EvaluationPage;