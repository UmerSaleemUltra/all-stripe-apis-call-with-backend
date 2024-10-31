import React, { useState } from 'react';
import axios from 'axios';

const RefundForm = () => {
    const [paymentIntentId, setPaymentIntentId] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleRefund = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/refund', {
                paymentIntentId,
                amount: parseInt(amount) * 100,
            });
            setMessage(`Refund Created: ID ${response.data.refund.id}`);
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <form onSubmit={handleRefund}>
            <h2>Process Refund</h2>
            <button type="submit">Process Refund</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default RefundForm;
