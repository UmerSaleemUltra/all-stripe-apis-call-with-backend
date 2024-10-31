import React, { useState } from 'react';
import axios from 'axios';

const PaymentIntentForm = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('usd');
    const [customer, setCustomer] = useState('');
    const [message, setMessage] = useState('');

    const handleCreatePaymentIntent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/create-payment-intent', {
                amount: parseInt(amount) * 100,
                currency,
                customer,
            });
            setMessage(`Payment Intent Created: ID ${response.data.paymentIntent.id}`);
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <form onSubmit={handleCreatePaymentIntent}>
            <h2>Create Payment Intent</h2>
            <button type="submit">Create Payment Intent</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default PaymentIntentForm;
