import { Button, Result } from "antd";
import React, { useEffect } from "react";

import { Link } from "react-router-dom";

const Error = (props) => {


  useEffect(() => {
    console.log(props);
  
    return () => {
      
    }
  }, [])
  
  return (
    <Result
      status={props.status}
      title={props.status}
      subTitle={props.message}
      extra={
        <Link to="/">
          <Button type="primary">Page d'accueil</Button>
        </Link>
      }
    />
  );
};
export default Error;
