import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Divider, Collapse } from "antd";
import {
  MinusCircleOutlined,
  PlusCircleTwoTone,
  CheckCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import flatten from "lodash/flatten";
import "./style.css";

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

const { Panel } = Collapse;

const DynamicFieldSet = ({ form, data, onClickConfirm, onClickDelete }) => (
  <Form
    showArrow={true}
    initialValues={{ names: data }}
    form={form}
    name="dynamic_form_item"
    {...formItemLayoutWithOutLabel}
  >
    <Form.List name="names">
      {(fields, { add, remove }, { errors }) => {
        console.log("fields :>> ", fields);
        return (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
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

                    {/* <Button
                      type="link"
                      shape="round"
                      size="small"
                      onClick={() => add(null, index)}
                      style={{ width: "40px" }}
                      icon={<PlusCircleTwoTone />}
                    /> */}
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
                    required
                    id="input-rebrique"
                    size="large"
                    placeholder="Nom de rubrique"
                    style={{ width: "60%" }}
                    // onChange={() => setdisabled(true)
                    // }
                    addonAfter={
                      <>
                        <CheckCircleOutlined
                          className="dynamic-confirm-button"
                          onClick={onClickConfirm}
                        />
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => {
                            remove(field.name);
                            onClickDelete(field);
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
                        id="buttom-add-btn"
                        type="link"
                        shape="round"
                        size="small"
                        onClick={() => add(null, index + 1)}
                      />
                    </Col>
                  </Row>
                  {/* <Button
                    type="link"
                    shape="round"
                    size="small"
                    onClick={() => add(null, index + 1)}
                    style={{ width: "40px", marginTop: "20px" }}
                    icon={<PlusCircleTwoTone />}
                  /> */}
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
const List = ({ rubriques }) => (
  <Col span={24}>
    <h1>Rubriques</h1>
    <Collapse>
      {rubriques.map((item, index) => (
        <Panel style={{ justifyItems: "center" }} header={item} key={index}>
          <p>Questions</p>
        </Panel>
      ))}
    </Collapse>
  </Col>
);
const Rubriques = () => {
  const data = ["Rub1", "Rub2", "Rub3", "Rub4"];

  const [form] = Form.useForm();
  const { getFieldValue } = form;
  const [rubriques, setRubriques] = useState(data);
  const [list, setList] = useState(true);
  // const [disabled, setdisabled] = useState(true);
  const onClickConfirm = () => setRubriques(flatten(getFieldValue("names")));
  const onClickDelete = (field) =>
    setRubriques([...rubriques.filter((_, index) => index !== field.name)]);
  return (
    <div className="container__antd p-top-20">
      <Row justify="space-between">
        <Col span={24}>
          {list ? (
            <>
              <Button
                type="dashed"
                onClick={() => setList(false)}
                style={{ width: "60%" }}
                icon={<PlusCircleTwoTone />}
              >
                Ajouter Rubrique
              </Button>
              <List {...{ rubriques }} />
            </>
          ) : (
            <>
              <Row>
                <Col offset={8} span={12}>
                  <Button
                    size="small"
                    type="dashed"
                    onClick={() => setList(true)}
                    style={{ width: "20%" }}
                    icon={<CheckOutlined />}
                  >
                    Confirmer
                  </Button>
                </Col>
              </Row>

              <DynamicFieldSet
                {...{ data, form, onClickConfirm, onClickDelete }}
              />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Rubriques;
