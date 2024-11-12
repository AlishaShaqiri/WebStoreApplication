import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import { getUserRole, isAuthenticated } from '../services/authService';
import { fetchFilters, fetchProducts } from '../services/productService';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    brand: '',
    price_min: '',
    price_max: '',
    color: '',
    availability: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [genders, setGenders] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [availabilities, setAvailabilities] = useState([
    { value: 'in', label: 'In Stock' },
    { value: 'out', label: 'Out of Stock' },
  ]);
  const userRole = getUserRole();
  const navigate = useNavigate();

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      gender: '',
      brand: '',
      price_min: '',
      price_max: '',
      color: '',
      availability: '',
    });
  };


  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 border rounded-lg">
        <div className="flex space-y-4 gap-5 my-auto mx-auto items-center justify-center p-5">
          <span />
          <select
            name="category"
            onChange={handleFilterChange}
            value={filters.category}
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            name="gender"
            onChange={handleFilterChange}
            value={filters.gender}
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender.name} value={gender.name}>
                {gender.name}
              </option>
            ))}
          </select>

          <select
            name="brand"
            onChange={handleFilterChange}
            value={filters.brand}
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>

          <select
            name="color"
            onChange={handleFilterChange}
            value={filters.color}
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Color</option>
            {colors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>

          <select
            name="availability"
            onChange={handleFilterChange}
            value={filters.availability}
            className="block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Availability</option>
            {availabilities.map((availability) => (
              <option key={availability.value} value={availability.value}>
                {availability.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="price_min"
            placeholder="Min Price"
            value={filters.price_min}
            onChange={handleFilterChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="number"
            name="price_max"
            placeholder="Max Price"
            value={filters.price_max}
            onChange={handleFilterChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />

          <div className="flex justify-center">
            <button
              onClick={handleClearFilters}
              className="p-2 bg-red-500 text-white rounded-md"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {isAuthenticated() && (userRole === 'Admin' || userRole === 'Advanced User') && (
        <div className="flex justify-end container">
          <button
            onClick={handleAddProductClick}
            className="p-2 bg-green-500 text-white rounded-md"
          >
            + Products
          </button>
        </div>
      )}
      {loading && <p className="text-center text-lg text-gray-500">Loading products...</p>}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-lg text-gray-500">No products found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
