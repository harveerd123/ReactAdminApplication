import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Layout, Menu, Table, Form, Input, Button, Modal, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Home from './components/pages/Home';

const App = () => {
    //const fetchUsers = async () => {
    //    const response = await fetch('/api/users');
    //    console.log(response.json());
    //}

    //useEffect(() => {
    //    fetchUsers();
    //}, []);
    return (
        <div>
            <Home />
        </div>
    );
}

export default App;