import React from 'react';
import { Link } from 'react-router-dom';
import { FaTag, FaInfoCircle, FaDollarSign } from 'react-icons/fa';

function ProductCard({ product }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="p-6">
        <div className="flex items-center mb-2">
          <FaTag className="text-blue-600 mr-2" />
          <h5 className="text-xl font-semibold text-gray-900">{product.name}</h5>
        </div>
        
        <p className="text-gray-600 mt-2 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center mt-4 text-lg font-bold text-green-600">
          <FaDollarSign className="mr-1" />
          <span>{product.price}</span>
        </div>
        
        <Link
          to={`/products/${product.id}`}
          className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        >
          <FaInfoCircle className="mr-2" />
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
