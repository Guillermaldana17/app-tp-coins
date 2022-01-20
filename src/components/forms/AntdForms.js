import React from "react";
import { Form, Input, InputNumber, Button } from "antd";

function AntdForms() {
  const handleFinish = data => {
    console.log(data);
  };

  return (
    <>
      <Form onFinish={handleFinish}>
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Requerido" },
            { min: 3, message: "minimo no cumple" },
            { max: 10, message: "largo no cumple" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="number">
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AntdForms;
