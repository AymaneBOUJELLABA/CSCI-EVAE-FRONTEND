import { Button, Col, Form, Input, Row } from "antd";
import { MinusCircleOutlined, PlusCircleTwoTone } from "@ant-design/icons";

import React from 'react';

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