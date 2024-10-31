// App.js
import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(''''''''''''''); // Replace with your actual public key

const App = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState('usd');
    const [customerId, setCustomerId] = useState('');
    const [paymentIntentId, setPaymentIntentId] = useState('');
    const [priceId, setPriceId] = useState('');
    const [productDetails, setProductDetails] = useState({ name: '', description: '', amount: 0, currency: 'usd' });
    const [subscriptions, setSubscriptions] = useState([]);

    const createCustomer = async () => {
        try {
            const response = await axios.post('http://localhost:3000/create-customer', { email, name });
            setCustomerId(response.data.customer.id);
            alert('Customer created successfully!');
        } catch (error) {
            console.error('Error creating customer:', error);
            alert('Error creating customer.');
        }
    };

    const createPaymentIntent = async () => {
        try {
            const response = await axios.post('http://localhost:3000/create-payment-intent', {
                amount,
                currency,
                customer: customerId,
            });
            setPaymentIntentId(response.data.paymentIntent.id);
            alert('Payment Intent created successfully!');
        } catch (error) {
            console.error('Error creating payment intent:', error);
            alert('Error creating payment intent.');
        }
    };

    const handlePayment = async () => {
        const stripe = await stripePromise;
        const result = await stripe.confirmCardPayment(paymentIntentId, {
            payment_method: {
                card: { // Here you should collect card details using a form or Stripe Elements
                    // Replace with actual card details input
                    number: '4242424242424242',
                    exp_month: 12,
                    exp_year: 2024,
                    cvc: '123',
                },
            },
        });
        
        if (result.error) {
            console.error('Payment failed:', result.error);
            alert('Payment failed.');
        } else {
            alert('Payment succeeded!');
        }
    };

    const createSubscription = async () => {
        try {
            const response = await axios.post('http://localhost:3000/create-subscription', {
                customerId,
                priceId,
            });
            alert('Subscription created successfully!');
        } catch (error) {
            console.error('Error creating subscription:', error);
            alert('Error creating subscription.');
        }
    };

    const createProduct = async () => {
        try {
            const response = await axios.post('http://localhost:3000/create-product', {
                name: productDetails.name,
                description: productDetails.description,
                amount: productDetails.amount,
                currency: productDetails.currency,
            });
            alert('Product and Price created successfully!');
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Error creating product.');
        }
    };

    const listPaymentMethods = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/list-payment-methods/${customerId}`);
            console.log(response.data.paymentMethods);
            alert('Payment methods listed in console!');
        } catch (error) {
            console.error('Error listing payment methods:', error);
            alert('Error listing payment methods.');
        }
    };

    const retrieveSubscriptions = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/subscriptions/${customerId}`);
            setSubscriptions(response.data.subscriptions);
            alert('Subscriptions retrieved successfully!');
        } catch (error) {
            console.error('Error retrieving subscriptions:', error);
            alert('Error retrieving subscriptions.');
        }
    };

    const updateCustomer = async () => {
        try {
            const response = await axios.post('http://localhost:3000/update-customer', {
                customerId,
                name,
                email,
            });
            alert('Customer updated successfully!');
        } catch (error) {
            console.error('Error updating customer:', error);
            alert('Error updating customer.');
        }
    };

    return (
        <div>
            <h1>Stripe Integration</h1>

            <h2>Create Customer</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={createCustomer}>Create Customer</button>

            <h2>Create Payment Intent</h2>
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={createPaymentIntent}>Create Payment Intent</button>
            <button onClick={handlePayment}>Pay</button>

            <h2>Create Subscription</h2>
            <input type="text" placeholder="Price ID" value={priceId} onChange={(e) => setPriceId(e.target.value)} />
            <button onClick={createSubscription}>Create Subscription</button>

            <h2>Create Product</h2>
            <input type="text" placeholder="Product Name" value={productDetails.name} onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })} />
            <input type="text" placeholder="Description" value={productDetails.description} onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })} />
            <input type="number" placeholder="Amount" value={productDetails.amount} onChange={(e) => setProductDetails({ ...productDetails, amount: e.target.value })} />
            <input type="text" placeholder="Currency" value={productDetails.currency} onChange={(e) => setProductDetails({ ...productDetails, currency: e.target.value })} />
            <button onClick={createProduct}>Create Product</button>

            <h2>Retrieve Payment Methods</h2>
            <button onClick={listPaymentMethods}>List Payment Methods</button>

            <h2>Retrieve Subscriptions</h2>
            <button onClick={retrieveSubscriptions}>Retrieve Subscriptions</button>
            <ul>
                {subscriptions.map(subscription => (
                    <li key={subscription.id}>{subscription.id} - {subscription.status}</li>
                ))}
            </ul>

            <h2>Update Customer</h2>
            <button onClick={updateCustomer}>Update Customer</button>
        </div>
    );
};

export default App;
