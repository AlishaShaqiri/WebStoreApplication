import React, { useState } from 'react';
import { createOrder } from '../services/orderService';  // Importing the order service

function Checkout({ cart }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calculate the total price
    const orderData = {
      client_name: formData.name,
      client_email: formData.email,
      client_phone: formData.phone,
      products: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      total_amount: totalPrice,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await createOrder(orderData); // Call the order service to create the order
      alert('Order placed', response);
      window.location.href="/"
      // You can redirect or show a confirmation message here
    } catch (error) {
      setError(error.message);
      console.error('Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <form className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button 
          onClick={handleCheckout} 
          disabled={loading} 
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          {loading ? 'Processing...' : 'Confirm Order'}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
