import { Button, Col, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { ajoutRubrique, getAllRubriques } from "../../../services/RubriqueService";

import {
  CheckOutlined
} from "@ant-design/icons";
import { DynamicFieldSet } from "./DynamicFieldSet";
import Error from "../../../shared/Error";
import cuid from "cuid";

const AddRubriques = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [idle, setIdle] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () =>
    {
      const response = await getAllRubriques();
      if(!response.status)
      {
        setLoading(false);
        setData(response);
        setIdle(false);  
      }else
      {
        setLoading(false);
        setIdle(false);
        setError(response);
      }
    };
    fetchData();
  }, []);

  const handleSend = () => {
    ajoutRubrique(data);
  };

  const onSetNewRubrique = ({ form, value, index }) => {
    data.splice(index, 0, {
      idRubrique: 1000,
      ordre: index + 1,
      type: "RBS",
      designation: value,
      questions: [],
    });
    setData(data.map((item, key) => ({ ...item, ordre: key + 1 })));
  };

  const onClickDelete = (field) => {
    setData(
      [...data.filter((_, index) => index !== field.name)].map(
        (item, index) => {
          return { ...item, ordre: index + 1 };
        }
      )
    );
  };

  console.log("data :>> ", data);

  if (idle || loading)
    return (
      <Spin
        style={{ position: "absolute", right: "46%", bottom: "42%" }}
        size="large"
      />
    );

  if(error)
  {
    return <Error status={error.status} message={error.message}/>
  }
  return (
    <div className="container__antd p-top-20">
      <Row justify="space-between">
        <Col span={24}>
          <Row>
            <Col offset={8} span={12}>
              <Button
                size="small"
                type="dashed"
                htmlType="submit"
                onClick={handleSend}
                style={{ width: "20%" }}
                icon={<CheckOutlined />}
              >
                Confirmer
              </Button>
            </Col>
          </Row>
          <DynamicFieldSet
            {...{
              data: data.sort((a, b) => a.ordre - b.ordre),
              onClickDelete,
              setData,
              onSetNewRubrique,
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AddRubriques;
