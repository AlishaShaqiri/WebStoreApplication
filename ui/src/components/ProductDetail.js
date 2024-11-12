import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails, createSocketConnection } from '../services/productService';
import { FaCheckCircle, FaTimesCircle, FaDollarSign, FaInfoCircle } from 'react-icons/fa';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductDetails(id);
        setProduct(data);
        setQuantity(data.quantity);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();

    const socket = createSocketConnection(id, (updatedQuantity) => {
      setQuantity(updatedQuantity);
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  if (!product) {
    return <p className="text-center text-lg text-gray-500">Product not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap gap-8 justify-center">
        <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">{product.name}</h2>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center text-2xl font-bold text-green-600 mb-8">
            <FaDollarSign className="mr-2" />
            <span>{product.price}</span>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              <FaInfoCircle className="inline mr-2 text-blue-600" />
              Product Information
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Brand:</strong> {product.brand}</li>
              <li><strong>Color:</strong> {product.color}</li>
              <li><strong>Category:</strong> {product.category}</li>
              <li className="flex items-center">
                <strong>Availability:</strong>
                {quantity > 0 ? (
                  <FaCheckCircle className="ml-2 text-green-500" />
                ) : (
                  <FaTimesCircle className="ml-2 text-red-500" />
                )}
              </li>
              <li><strong>Current Quantity:</strong> {quantity}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
