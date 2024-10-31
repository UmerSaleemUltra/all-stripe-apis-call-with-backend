import React, { useState } from 'react';
import axios from 'axios';

const SubscriptionForm = () => {
    const [customerId, setCustomerId] = useState('');
    const [priceId, setPriceId] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateSubscription = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/create-subscription', {
                customerId,
                priceId,
            });
            setMessage(`Subscription Created: ID ${response.data.subscription.id}`);
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <form onSubmit={handleCreateSubscription}>
            <h2>Create Subscription</h2>
            <button type="submit">Create Subscription</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default SubscriptionForm;
