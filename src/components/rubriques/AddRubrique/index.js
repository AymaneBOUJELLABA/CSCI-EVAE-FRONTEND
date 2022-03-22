import {
  ALERT_TYPES,
  RUBRIQUES_SUCCESS_MESSAGES,
  RUBRIQUES_WARNING_MESSAGES,
} from "../../../shared/constant";
import { BackTop, Button, Col, Row, Spin, message, notification } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  ajoutRubrique,
  getAllRubriques,
} from "../../../services/RubriqueService";

import { DynamicFieldSet } from "./DynamicFieldSet";
import Error from "../../../shared/Error";
import { isEmpty } from "lodash";

const AddRubriques = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [idle, setIdle] = useState(true);
  const openNotificationWithIcon = () =>
    notification.success({
      message: "La rubrique est bien ajoutée",
    });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await getAllRubriques();

      if (!response.status) {
        setLoading(false);
        setData(response);
        setIdle(false);
      } else {
        setLoading(false);
        setIdle(false);
        setError(response);
      }
    };
    fetchData();
  }, []);

  const onShowAlert = (msg, type) => message[type](msg);

  const handleSend = async () => {
    await ajoutRubrique(data);
    props.closeUpdate();
    openNotificationWithIcon();
  };

  console.log(data);
  const onSetNewRubrique = ({ form, value, index, fields }) => {
    let found = false;

    data.map((el, i) => {
      if (
        index === i &&
        fields.length === data.length &&
        el.designation !== value
      ) {
        el.designation = value;
        found = true;
      }
    });

    const existed = data.find(
      (el) => el.designation.toLowerCase() === value.toLowerCase()
    );

    if (found) {
      return onShowAlert(
        RUBRIQUES_WARNING_MESSAGES.MODIFIED,
        ALERT_TYPES.SUCCESS
      );
    }
    if (existed) {
      return onShowAlert(
        RUBRIQUES_WARNING_MESSAGES.EXISTED,
        ALERT_TYPES.WARNING
      );
    }
    if (!value || isEmpty(value)) {
      return onShowAlert(RUBRIQUES_WARNING_MESSAGES.EMPTY, ALERT_TYPES.WARNING);
    }
    if (!found && !existed) {
      const element = {
        idRubrique: -1,
        ordre: index + 1,
        type: "RBS",
        designation: value,
        questions: [],
      };
      data.splice(index, 0, element);
      setData(data.map((item, key) => ({ ...item, ordre: key + 1 })));
      onShowAlert(RUBRIQUES_SUCCESS_MESSAGES.ADDED, ALERT_TYPES.SUCCESS);
    }
  };

  const onClickConfirm = (input) => {
    return data.find(
      (el) => el.designation.toLowerCase() === input.toLowerCase()
    );
  };
  const onClickDelete = (field, value) => {
    if (!value && !isEmpty(value)) {
      setData(
        data
          .filter((_, index) => index !== field.name)
          .map((item, index) => {
            return { ...item, ordre: index + 1 };
          })
      );
    }
  };

  if (idle || loading)
    return (
      <Spin
        tip="Chargement..."
        style={{ position: "absolute", right: "46%", bottom: "42%" }}
        size="large"
      />
    );

  if (error) {
    return <Error status={error.status} message={error.message} />;
  }
  return (
    <div className="container__antd p-top-20" id="topPage">
      <Row justify="space-between">
        <Col span={24}>
          <DynamicFieldSet
            {...{
              data: data.sort((a, b) => a.ordre - b.ordre),
              onClickDelete,
              setData,
              onSetNewRubrique,
              onShowAlert,
              handleSend,
              onCancel: props.closeUpdate,
              onClickConfirm,
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AddRubriques;
