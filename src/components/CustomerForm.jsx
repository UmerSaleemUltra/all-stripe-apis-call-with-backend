import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateCustomer = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/create-customer', { email, name });
            setMessage(`Customer Created: ID ${response.data.customer.id}`);
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <form onSubmit={handleCreateCustomer}>
            <h2>Create Customer</h2>
            <button type="submit">Create Customer</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default CustomerForm;
