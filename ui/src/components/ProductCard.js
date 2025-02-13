import React from 'react';
import { Link } from 'react-router-dom';
import { FaTag, FaInfoCircle, FaDollarSign, FaStar } from 'react-icons/fa';

function ProductCard({ product }) {
  // Construct the image URL if the product image exists
  const imageUrl = product && product.image ? `https://webstore-api-467722929070.us-central1.run.app${product.image}` : 'https://via.placeholder.com/300';

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl} // Use the constructed image URL
          alt={product.name}
          className="w-full h-full object-cover transition-transform transform hover:scale-110"
        />
        {/* Badge for Special Offers */}
        {product.isOnSale && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Sale
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6">
        <div className="flex items-center mb-2">
          <FaTag className="text-primary mr-2" />
          <h5 className="text-xl font-semibold text-gray-900">{product.name}</h5>
        </div>

        {/* Product Description */}
        <p className="text-gray-600 mt-2 line-clamp-3">
          {product.description}
        </p>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-lg font-bold text-primary">
            <FaDollarSign className="mr-1" />
            <span>{product.price}</span>
          </div>
          <div className="flex items-center text-yellow-500">
            <FaStar className="mr-1" />
            <span>{product.rating || '4.5'}</span>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/products/${product.id}`}
          className="mt-6 inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all transform hover:scale-105"
        >
          <FaInfoCircle className="mr-2" />
          View Product
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
