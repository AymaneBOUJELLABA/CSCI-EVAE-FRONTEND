import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Collapse, Spin } from "antd";
import {
  MinusCircleOutlined,
  PlusCircleTwoTone,
  CheckCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
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

const DynamicFieldSet = ({ data, onSetNewRubrique, onClickDelete }) => {
  const [form] = Form.useForm();

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
          console.log("fields :>> ", fields);
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
                      onChange={(_) =>
                        onSetNewRubrique({
                          form,
                          value: _.target.value,
                          index: field.name,
                        })
                      }
                      required
                      id="input-rebrique"
                      size="large"
                      placeholder="Nom de rubrique"
                      style={{ width: "60%" }}
                      addonAfter={
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => {
                            remove(field.name);
                            onClickDelete(field);
                          }}
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
  //const data = ["Rub1", "Rub2", "Rub3", "Rub4"];
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

  // const [disabled, setdisabled] = useState(true);
  const onSetNewRubrique = ({ form, value, index }) => {
    console.log("form :>> ");
    console.log("value :>> ", value);
    console.log("index :>> ", index);

    const designations = form.getFieldValue("designations");
    const ff = designations.map((item) =>
      data.find((el) => el.designation === item)
    );
  };
  //setData(flatten(getFieldValue("names")));

  const onClickDelete = (field) =>
    setData([...data.filter((_, index) => index !== field.name)]);

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
                onClick={() => {}}
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
              onSetNewRubrique,
              onClickDelete,
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AddRubriques;
