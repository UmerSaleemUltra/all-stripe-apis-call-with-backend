import React, { useState } from 'react';
import axios from 'axios';

const InvoiceForm = () => {
    const [customerId, setCustomerId] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('usd');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateInvoice = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/create-invoice', {
                customerId,
                amount: parseInt(amount) * 100,
                currency,
                description,
            });
            setMessage(`Invoice Created: ID ${response.data.invoice.id}`);
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <form onSubmit={handleCreateInvoice}>
            <h2>Create Invoice</h2>
            {/* Form Fields */}
            <button type="submit">Create Invoice</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default InvoiceForm;
