import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deleteProduct, fetchProductDetails, updateProduct } from '../services/productService';
import { FaCheckCircle, FaTimesCircle, FaDollarSign, FaInfoCircle, FaShoppingCart, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { getUserRole } from '../services/authService'; // Import the function to check user role

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
  });

  const userRole = getUserRole(); // Get the current user role

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductDetails(id);
        setProduct(data);
        setQuantity(data.quantity);
        setFormData({
          name: data.name,
          price: data.price,
          description: data.description,
          quantity: data.quantity,
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleEditButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      alert('Product deleted successfully');
      window.location.href='/products'; // Redirect to product listing page after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, description, quantity } = formData;
    console.log(name, price, description, quantity);

    try {
      const updatedProduct = await updateProduct(id, formData); // Call the updateProduct service
      setProduct(updatedProduct);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) return <p className="text-center text-lg text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;
  if (!product) return <p className="text-center text-lg text-gray-500">Product not found.</p>;

  // Construct Image URL (Make sure your backend serves the 'uploads' folder)
  const imageUrl = `https://webstore-api-467722929070.us-central1.run.app${product.image}`;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap gap-8 justify-center">
        {/* Product Details Card */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className=" flex justify-center">
          <img 
            src={imageUrl} 
            alt={product.name} 
            className="w-full max-w-sm rounded-lg shadow-lg object-cover"
          />
        </div>
          {/* Product Name */}
          <h2 className="text-3xl font-bold text-primary mb-4">{product.name}</h2>

          {/* Product Description */}
          <p className="text-lg text-gray-600 mb-6">{product.description}</p>

          {/* Price */}
          <div className="flex items-center text-2xl font-bold text-secondary mb-8">
            <FaDollarSign className="mr-2" />
            <span>{product.price}</span>
          </div>

          {/* Product Information */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-primary mb-4">
              <FaInfoCircle className="inline mr-2 text-secondary" />
              Product Information
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Availability:</strong>
                {quantity > 0 ? (
                  <FaCheckCircle className="ml-2 text-green-500" />
                ) : (
                  <FaTimesCircle className="ml-2 text-red-500" />
                )}
              </li>
              <li><strong>Current Quantity:</strong> {quantity}</li>
            </ul>
          </div>

          {/* Add to Cart Button */}
          {quantity > 0 && (
            <button
              onClick={() => addToCart(product)}
              className="mt-6 flex items-center justify-center w-full bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary/90 transition-all transform hover:scale-105"
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
          )}

          {/* Edit Button (Only visible to Admins) */}
          {userRole === 'Admin' && (
            <>
              <button
                onClick={handleEditButtonClick}
                className="mt-6 flex items-center justify-center w-full bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-400 transition-all transform hover:scale-105"
              >
                <FaEdit className="mr-2" />
                Edit Product
              </button>
              
              {/* Delete Button (Only visible to Admins) */}
              <button
                onClick={handleDelete}
                className="mt-6 flex items-center justify-center w-full bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-400 transition-all transform hover:scale-105"
              >
                <FaTrashAlt className="mr-2" />
                Delete Product
              </button>
            </>
          )}
        </div>
      </div>

      {/* Edit Product Modal */}
      {isModalOpen && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">Stock Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Enter quantity"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 bg-gray-400 text-white rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Update Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
