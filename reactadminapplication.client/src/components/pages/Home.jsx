import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Layout, Menu, Table, Form, Input, Button, Modal, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const Home = () => {
    const [users, setUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [form] = Form.useForm();



    const fetchUsers = async () => {
        const response = await axios.get('https://localhost:5173/api/users');
        setUsers(response.data);
    }

    const deleteUser = async (id) => {
        await axios.delete(`https://localhost:5173/api/users/${id}`);
        fetchUsers();
    }

    const updateUser = async (values) => {
        if (currentUser && currentUser.id) {
            const updatedUser = { ...values, id: currentUser.id }; 
            await axios.put(`https://localhost:5173/api/users/${currentUser.id}`, updatedUser);
        } else {
            await axios.post(`https://localhost:5173/api/users/`, values);
        }
        setIsModalVisible(false);
        setCurrentUser(null);
        form.resetFields();
        fetchUsers();
    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Password', dataIndex: 'password', key: 'password' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        icon = {<EditOutlined />}
                        onClick={() => { setCurrentUser(record); form.setFieldsValue(record); setIsModalVisible(true) }}
                    >
                    </Button>
                    <Button
                        icon = {<DeleteOutlined />}
                        danger
                        onClick={() => deleteUser(record.id)}
                    >
                    </Button>
                </Space>
            )
        }
    ];

    const passwordRules = [
        { required: true, message: 'Password is required' },
        { min: 8, message: 'Password must be at least 8 characters' },
        { pattern: /(?=.*[a-z])/, message: 'Password must contain at least one lowercase letter' },
        { pattern: /(?=.*[A-Z])/, message: 'Password must contain at least one uppercase letter' },
        { pattern: /(?=.*[0-9])/, message: 'Password must contain at least one number' },
        { pattern: /(?=.*[!@#$%^&*])/, message: 'Password must contain at least one special character' }
    ];




    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Header>
                    <Menu theme="dark" mode="horizontal" items={[
                        { key: 'home', label: 'Home' },
                        { key: 'contact', label: 'Contact' }
                    ]} />
                </Header>
                <Content style={{ padding: '50px' }}>
                    <Space style={{ marginBottom: '20px', float: 'left' }}>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                            Add User
                        </Button>
                    </Space>
                    <Space style={{ marginBottom: '20px', float: 'right' }}>
                        <Search
                            placeholder="Search by name or email"
                            onSearch={value => setSearchTerm(value)}
                            style={{ width: 300}}
                        />
                    </Space>
                    <div style={{ clear: 'both' }} />
                    <Table dataSource={filteredUsers} columns={columns} rowkey="id" />

                    <Modal
                        title={currentUser ? 'Edit User' : 'Add User'}
                        open={isModalVisible}
                        onCancel={() => { setIsModalVisible(false); setCurrentUser(null); form.resetFields(); }}
                        footer={null}
                    >
                        <Form
                            form={form}
                            initialValues={currentUser}
                            onFinish={updateUser}
                            layout="vertical"
                        >
                            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="password" label="Password" rules={passwordRules}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Content>
                <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: '#fff', position: 'sticky', bottom: 0 }}>
                    {new Date().getFullYear()} Admin Application
                </Footer>
            </Layout>
        </div>
    );
}

export default Home;