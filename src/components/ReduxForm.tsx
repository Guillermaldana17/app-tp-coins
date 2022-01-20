import React from 'react'
import { Form, Input, Button } from 'antd';

function ReduxForm() {

    const saveForm = ({data}: {data:string}) => {
        console.log(data);
    }
    return (
        <Form onFinish={saveForm}>
            <Form.Item name="data" rules={[{required: true, message: "Obligatorio"}]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ReduxForm
