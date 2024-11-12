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
    quantity: ''
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

    
    if (!productData.name || !productData.price || !productData.category_id || !productData.brand_id || !productData.size_id || !productData.color_id || !productData.person || !productData.quantity) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to add a product.');
        return;
      }

      const response = await addProduct(productData, token); 
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
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">Add Product</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-3 border rounded-md"
        />

        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-3 border rounded-md"
        />

        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border rounded-md"
        />

        <select
          name="category_id"
          onChange={handleChange}
          value={productData.category_id}
          className="w-full p-3 border rounded-md"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          name="brand_id"
          onChange={handleChange}
          value={productData.brand_id}
          className="w-full p-3 border rounded-md"
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <select
          name="size_id"
          onChange={handleChange}
          value={productData.size_id}
          className="w-full p-3 border rounded-md"
        >
          <option value="">Select Size</option>
          {sizes.map((size) => (
            <option key={size.id} value={size.id}>
              {size.size}
            </option>
          ))}
        </select>

        <select
          name="color_id"
          onChange={handleChange}
          value={productData.color_id}
          className="w-full p-3 border rounded-md"
        >
          <option value="">Select Color</option>
          {colors.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>

        <select
          name="person"
          onChange={handleChange}
          value={productData.person}
          className="w-full p-3 border rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Children">Children</option>
        </select>

        <input
          type="number"
          name="quantity"
          value={productData.quantity}
          onChange={handleChange}
          placeholder="Stock Quantity"
          className="w-full p-3 border rounded-md"
        />

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-md"
          disabled={loading}
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
