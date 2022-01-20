import { Form, Popconfirm, Typography, Card, Input, Button, List, Checkbox, Select, Tag, Space, Badge } from 'antd';
import {  useState } from 'react';
import { ITag, Tags, Task } from '../firebase/TaskInterface';
import useFirebaseDatabase from '../firebase/useFirebaseDatabase';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
const { Option } = Select;

const About = () => {
    const [form] = Form.useForm();

    const { save, deleteTask, update, documents, loading } = useFirebaseDatabase("tasks");
    const [selectedId, setSelectedId] = useState<string>("");

    const onFinish = (values: Task) => {
        values.finished = values.finished !== undefined ? values.finished : false;
        if (selectedId === "") {
            save(values).then(() => {
                form.resetFields();
            });
        } else {
            update(selectedId, values).then(() => {
                form.resetFields();
                setSelectedId("");
            });
        }
    };

    const setFormToUpdate = (task: Task) => {
        setSelectedId(task.id!);
        console.log(task.id);
        form.setFieldsValue({
            name: task.name,
            priority: task.priority,
            tags: task.tags,
            finished: task.finished
        });
    }

    const priorities = ["High", "Medium", "Low"];

    const tags: Array<ITag> = [
        { show: "Hogar", key: Tags.HOME, color: "magenta" },
        { show: "Trabajo", key: Tags.WORK, color: "green" },
        { show: "Familia", key: Tags.FAMILY, color: "lime" },
        { show: "Mascotas", key: Tags.PETS, color: "geekblue" },
    ]

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High": return "red";
            case "Medium": return "yellow";
            case "Low": return "green";
        }
    }

    return (
        <>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Tarea"
                    name="name"
                    rules={[
                        { required: true, message: 'Campo obligatorio!' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Prioridad"
                    name="priority"
                    rules={[{ required: true, message: 'Please select!' }]}
                >
                    <Select>
                        {priorities.map((priority: string, index: number) =>
                            <Option value={priority} key={index}>{priority}</Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Tags"
                    name="tags"
                    rules={[{ required: true, message: 'Please select!' }]}
                >
                    <Select
                        mode="multiple"
                        allowClear>
                        {tags.map((tag: ITag) =>
                            <Option value={tag.key} key={tag.key}>{tag.show}</Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item name="finished" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Finalizado</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <List
                grid={{ gutter: 8, column: 4 }}
                dataSource={documents}
                loading={loading}
                renderItem={(item: Task) => (
                    <List.Item>
                        <Badge.Ribbon text={item.priority} color={getPriorityColor(item.priority)}>
                            <Card title={<Typography.Text delete={item.finished}>{item.name}</Typography.Text>}>
                                <Space
                                    direction="vertical">
                                    <Space direction="horizontal">
                                        {item?.tags?.map((tag: number) =>
                                            <Tag key={tag} color={tags[tag].color}>{tags[tag].show}</Tag>
                                        )}
                                    </Space>
                                    <Space direction="horizontal">
                                        <Popconfirm title="Eliminar?" onConfirm={() => deleteTask(item.id!)}>
                                            <Button
                                                icon={<DeleteOutlined />}
                                                shape="circle"
                                                type="primary"
                                                danger />
                                        </Popconfirm>
                                        <Button
                                            icon={<EditOutlined />}
                                            shape={"circle"}
                                            type="ghost"
                                            onClick={() => setFormToUpdate(item)}
                                        />
                                    </Space>
                                </Space>
                            </Card>
                        </Badge.Ribbon>
                    </List.Item>
                )}
            />
        </>
    );
};
export default About
