import React from 'react'
import { Alert } from 'antd';

const onClose = (e) => {
  console.log(e, 'I was closed.');
};

const ErrorRubrique =() => {


return(
    <>
     <Alert
      message="Error Text"
      description="Error Description Error Description Error Description Error Description Error Description Error Description"
      type="error"
      closable
      onClose={onClose}
    />
    </>
)
}
export default ErrorRubrique;