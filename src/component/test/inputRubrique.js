import { Button, Form, Input } from 'antd';
import React from 'react'

function InputRubrique(props)
{
  
  const onFinishFailed = (errorInfo) =>
  {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={props.onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Nom Rubrique"
        name="nomRubrique"
        wrapperCol={{span: '4'}}
        rules={[{ required: true, message: 'Please input Nom du rubrique' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    );
}

export default InputRubrique;
