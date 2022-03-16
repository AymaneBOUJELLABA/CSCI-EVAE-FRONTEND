import { Button, Result } from "antd";

import { Link } from "react-router-dom";
import React from "react";

const Error = (props) => {
  return (
    <Result
      status={props.status}
      title={props.status}
      subTitle={props.message}
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};
export default Error;
