import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails, createSocketConnection } from '../services/productService';

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
        <div className="w-full md:w-1/2 grid justify-center">
          <h2 className="text-3xl font-semibold text-gray-900">{product.name}</h2>
          <p className="text-lg text-gray-600 mt-2">{product.description}</p>
          <p className="text-lg font-bold text-green-600 mt-4">${product.price}</p>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Product Information</h3>
            <ul className="list-disc pl-6 mt-2 text-gray-700">
              <li><strong>Brand:</strong> {product.brand}</li>
              <li><strong>Color:</strong> {product.color}</li>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Availability:</strong> {quantity > 0 ? 'In Stock' : 'Out of Stock'}</li>
              <li><strong>Current Quantity:</strong> {quantity}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
