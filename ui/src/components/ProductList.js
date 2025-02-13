import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaRedoAlt } from 'react-icons/fa';
import ProductCard from './ProductCard';
import { getUserRole, isAuthenticated } from '../services/authService';
import { fetchFilters, fetchProducts } from '../services/productService';

const initialFilters = {
  category: '',
  gender: '',
  brand: '',
  price_min: '',
  price_max: '',
  color: '',
  availability: '',
};

const availabilities = [
  { value: 'in', label: 'In Stock' },
  { value: 'out', label: 'Out of Stock' },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [genders, setGenders] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const userRole = getUserRole();
  const navigate = useNavigate();

  // Fetch filter options
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const data = await fetchFilters();
        setCategories(data.categories);
        setGenders(data.genders);
        setBrands(data.brands);
        setColors(data.colors);
      } catch (error) {
        console.error('Error fetching filter data:', error);
        setError('Failed to load filter data. Please try again later.');
      }
    };
    loadFilters();
  }, []);

  // Fetch products based on filters
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts(filters);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [filters]);

  const handleAddProductClick = () => {
    navigate('/products/add');
  };

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const renderFilterSelect = (name, options, placeholder) => (
    <select
      name={name}
      onChange={handleFilterChange}
      value={filters[name]}
      className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.id || option.value} value={option.id || option.value}>
          {option.name || option.label}
        </option>
      ))}
    </select>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {renderFilterSelect('category', categories, 'Category')}
          {renderFilterSelect('gender', genders, 'Gender')}
          {renderFilterSelect('brand', brands, 'Brand')}
          {renderFilterSelect('color', colors, 'Color')}
          {renderFilterSelect('availability', availabilities, 'Availability')}
          <input
            type="number"
            name="price_min"
            placeholder="Min Price"
            value={filters.price_min}
            onChange={handleFilterChange}
            className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
          />
          <input
            type="number"
            name="price_max"
            placeholder="Max Price"
            value={filters.price_max}
            onChange={handleFilterChange}
            className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleClearFilters}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
          >
            <FaRedoAlt className="mr-2" />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Add Product Button */}
      {isAuthenticated() && (userRole === 'Admin' || userRole === 'Advanced User') && (
        <div className="flex justify-end mb-6">
          <button
            onClick={handleAddProductClick}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-all shadow-md"
          >
            <FaPlus className="mr-2" /> Add Product
          </button>
        </div>
      )}

      {/* Loading and Error States */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      )}
      {error && (
        <div className="text-center py-8">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;