import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <h5 className="text-xl font-semibold text-gray-900">{product.name}</h5>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-lg font-bold text-green-600 mt-2">${product.price}</p>
        <Link to={`/products/${product.id}`} className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
