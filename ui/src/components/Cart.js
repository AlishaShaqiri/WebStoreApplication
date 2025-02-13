import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ cart, removeFromCart }) {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center border-b py-2">
              <span>{item.name} - ${item.price} x {item.quantity}</span>
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <Link to="/checkout" className="block mt-4 px-4 py-2 bg-green-600 text-white text-center rounded">
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
}

export default Cart;
