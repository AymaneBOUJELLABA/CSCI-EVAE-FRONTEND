import { Button, Col, Collapse, Form, Input, Row, Space, Spin } from "antd";
import {
  CheckCircleOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import { ajoutRubrique } from "../../../services/RubriqueService";
import cuid from "cuid";
import flatten from "lodash/flatten";
import { isEmpty } from "lodash";

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

const DynamicFieldSet = ({
  data,
  setData,
  onSetNewRubrique,
  onClickDelete,
}) => {
  const [form] = Form.useForm();

  let lastkey;
  return (
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
          lastkey = fields[fields.length - 1].key;

          console.log(lastkey);
          return (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Rubriques" : ""}
                  required={false}
                  key={field.key}
                >
                  {fields.length && index === 0 && (
                    <Form.Item style={{ height: "1px" }}>
                      <Row>
                        <Col md={12}>
                          <div>
                            <PlusCircleTwoTone
                              id="top-add-btn"
                              type="link"
                              shape="round"
                              size="small"
                              onClick={() => add(null, index)}
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
                        message: "This is a required field",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      onBlur={(_) =>
                        onSetNewRubrique({
                          form,
                          value: _.target.value,
                          index: field.name,
                        })
                      }
                      disabled={field.key <= lastkey ? true : false}
                      required
                      id="input-rebrique"
                      size="large"
                      placeholder="Nom de rubrique"
                      style={{ width: "60%" }}
                      addonAfter={
                        <MinusCircleOutlined
                          disabled={field.key <= lastkey ? true : false}
                          className="dynamic-delete-button"
                          onClick={
                            field.key <= lastkey
                              ? null
                              : () => {
                                  remove(field.name);
                                  onClickDelete(field);
                                }
                          }
                        />
                      }
                    />
                  </Form.Item>
                  <Form.Item style={{ height: "0px" }}>
                    <Row>
                      <Col md={12}>
                        <PlusCircleTwoTone
                          id="buttom-add-btn"
                          type="link"
                          shape="round"
                          size="small"
                          onClick={() => add(null, index + 1)}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </Form.Item>
              ))}
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
  );
};

const AddRubriques = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [idle, setIdle] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await fetch("http://localhost:8082/api/rubriques", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setData(data);
          setIdle(false);
        })
        .catch((error) => {
          setLoading(false);
          setIdle(false);
          setError(true);
        });
    };
    fetchData();
  }, []);

  const handleSend = () => {
    ajoutRubrique(data);
  };

  const onSetNewRubrique = ({ form, value, index }) => {
    data.splice(index, 0, {
      idRubrique: cuid(),
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
