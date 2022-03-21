import "../style.css";

import {
  ALERT_TYPES,
  RUBRIQUES_WARNING_MESSAGES,
} from "../../../shared/constant";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import {
  Button as ButtonFloat,
  Container,
  Link,
} from "react-floating-action-button";
import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { MenuRounded } from "@mui/icons-material";
import VerticalAlignTopRoundedIcon from "@mui/icons-material/VerticalAlignTopRounded";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

export const DynamicFieldSet = ({
  data,
  onSetNewRubrique,

  onClickConfirm,
  onClickDelete,
  onShowAlert,
  handleSend,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [lastKey, setLastKey] = useState(-1);
  const [confirm, setConfirm] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    setLastKey(data.length - 1);
  }, []);
  return (
    <>
      <div>
        <Form
          initialValues={{
            designations: data.map((item) => item.designation),
          }}
          form={form}
          name="dynamic_form_item"
          {...formItemLayoutWithOutLabel}
        >
          <Form.List name="designations">
            {(fields, { add, remove }, { errors }) => {
              console.log("fields :>> ", fields);
              console.log("data :>> ", data);
              return (
                <>
                  <h1>Création des rubriques</h1>
                  {fields.map((field, index) => {
                    const disabled = field.key <= lastKey;

                    return (
                      <>
                        <Form.Item
                          id="topform"
                          {...(index === 0
                            ? formItemLayout
                            : formItemLayoutWithOutLabel)}
                          label={index === 0 ? "Rubrique:" : ""}
                          required={false}
                          key={field.key}
                        >
                          {fields.length && index === 0 && (
                            <Form.Item style={{ height: "1px" }}>
                              <Row>
                                <Col md={12}>
                                  <div>
                                    <PlusCircleTwoTone
                                      key={field.key}
                                      id="top-add-btn"
                                      type="link"
                                      shape="round"
                                      size="small"
                                      onClick={() => {
                                        const doThis = () => {
                                          add(null, index);
                                          setInputValue("");
                                        };
                                        return fields.length > data.length
                                          ? onShowAlert(
                                              RUBRIQUES_WARNING_MESSAGES.EMPTY,
                                              ALERT_TYPES.WARNING
                                            )
                                          : doThis();
                                      }}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Form.Item>
                          )}

                          <Form.Item
                            {...field}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: "Ce champs est requis!",
                              },
                            ]}
                            noStyle
                          >
                            <Input
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  onSetNewRubrique({
                                    value: inputValue,
                                    index: field.name,
                                    fields: fields,
                                  });
                                  setInputValue("");
                                  setConfirm(true);
                                }
                              }}
                              onChange={(_) => {
                                setInputValue(_.target.value);
                              }}
                              disabled={disabled}
                              required
                              id="input-rebrique"
                              key={field.name}
                              size="large"
                              placeholder="Nom de la rubrique"
                              style={{ width: "60%", marginTop: "20px" }}
                              addonAfter={
                                <>
                                  <CheckCircleOutlined
                                    className="dynamic-confirm-button"
                                    disabled={disabled}
                                    onClick={
                                      field.key <= lastKey
                                        ? null
                                        : () => {
                                            onSetNewRubrique({
                                              value: inputValue,
                                              index: field.name,
                                              fields: fields,
                                            });
                                            // setInputValue("");
                                            setConfirm(true);
                                          }
                                    }
                                  />
                                  <MinusCircleOutlined
                                    disabled={disabled}
                                    className="dynamic-delete-button"
                                    onClick={() => {
                                      const doThis = () => {
                                        remove(field.name);

                                        onClickDelete(field, inputValue);
                                        setInputValue("");
                                      };
                                      return field.key <= lastKey
                                        ? null
                                        : doThis();
                                    }}
                                  />
                                </>
                              }
                            />
                          </Form.Item>
                          <Form.Item style={{ height: "0px" }}>
                            <Row>
                              <Col md={12}>
                                <PlusCircleTwoTone
                                  className="cursor_pointer"
                                  id="buttom-add-btn"
                                  type="link"
                                  shape="round"
                                  size="small"
                                  key={field.key}
                                  onClick={() => {
                                    const doThis = () => {
                                      add(null, index + 1);
                                      setInputValue("");
                                    };
                                    return fields.length > data.length
                                      ? onShowAlert(
                                          RUBRIQUES_WARNING_MESSAGES.EMPTY,
                                          ALERT_TYPES.WARNING
                                        )
                                      : doThis();
                                  }}
                                />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Form.Item>
                        <Divider />
                      </>
                    );
                  })}
                  <Form.ErrorList errors={errors} />
                  {fields.length < 1 && (
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: "60%" }}
                        icon={<PlusCircleTwoTone />}
                      >
                        Ajouter Rubrique
                      </Button>
                    </Form.Item>
                  )}
                </>
              );
            }}
          </Form.List>
        </Form>

        <Container>
          <Link href="#topPage" tooltip="Défiler vers le haut" rotate={false}>
            <VerticalAlignTopRoundedIcon sx={{ fontSize: 20 }} />
          </Link>
          <ButtonFloat
            tooltip="Annuler"
            className="cursor_pointer"
            rotate={false}
            onClick={() => onCancel()}
          >
            <CancelOutlinedIcon sx={{ fontSize: 25 }} />
          </ButtonFloat>
          <ButtonFloat
            className="cursor_pointer"
            tooltip="Confirmer l'ajout"
            rotate={false}
            onClick={() => {
              !confirm
                ? onShowAlert(
                    RUBRIQUES_WARNING_MESSAGES.EMPTY,
                    ALERT_TYPES.WARNING
                  )
                : handleSend();
            }}
          >
            <AddTaskRoundedIcon sx={{ fontSize: 30 }} />
          </ButtonFloat>
          <ButtonFloat tooltip="Action" rotate={false}>
            <MenuRounded sx={{ fontSize: 35 }} />
          </ButtonFloat>
        </Container>
      </div>

      {/* </ButtonFloat> */}
    </>
  );
};
