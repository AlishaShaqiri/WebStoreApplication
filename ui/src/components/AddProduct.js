import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct, fetchFilters } from '../services/productService';

function AddProduct() {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category_id: '',
    brand_id: '',
    size_id: '',
    color_id: '',
    person: '',
    quantity: '',
    image: null,  // New field for image
  });
  

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductFilters = async () => {
      try {
        const filterData = await fetchFilters();
        setCategories(filterData.categories);
        setBrands(filterData.brands);
        setSizes(filterData.sizes);
        setColors(filterData.colors);
      } catch (err) {
        console.error('Error fetching filters:', err);
        setError('Failed to load filter data. Please try again later.');
      }
    };

    fetchProductFilters();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productData.name || !productData.price || !productData.category_id || !productData.brand_id || !productData.size_id || !productData.color_id || !productData.person || !productData.quantity || !productData.image) {
      setError('All fields including image are required.');
      return;
    }
    
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to add a product.');
        return;
      }
    
      // Prepare FormData
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });
    
      const response = await addProduct(formData, token); // Ensure API accepts FormData
      alert('Product added successfully!');
      navigate(`/products/${response.id}`);
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="container mx-auto max-w-lg p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Add New Product</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <select
            name="category_id"
            onChange={handleChange}
            value={productData.category_id}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <select
            name="brand_id"
            onChange={handleChange}
            value={productData.brand_id}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <select
            name="size_id"
            onChange={handleChange}
            value={productData.size_id}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Size</option>
            {sizes.map((size) => (
              <option key={size.id} value={size.id}>{size.size}</option>
            ))}
          </select>

          <select
            name="color_id"
            onChange={handleChange}
            value={productData.color_id}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Color</option>
            {colors.map((color) => (
              <option key={color.id} value={color.id}>{color.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Gender</label>
          <select
            name="person"
            onChange={handleChange}
            value={productData.person}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Children">Children</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Stock Quantity</label>
          <input
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
  <label className="block text-gray-700 font-medium">Product Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setProductData({ ...productData, image: e.target.files[0] })}
    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>



        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
