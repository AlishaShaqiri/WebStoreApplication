import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-background from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Your Favorite Finds, <span className="text-primary">All in One Place!</span> 
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover the finest collection of products curated just for you.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center px-6 py-3 bg-secondary text-white text-lg font-semibold rounded-lg hover:bg-primary transition-all transform hover:scale-105"
        >
          Explore Products
          <FaArrowRight className="ml-2" />
        </Link>
      </div>

      {/* Featured Products Section */}
      <div className="mt-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img
              src="https://via.placeholder.com/400"
              alt="Product 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Premium Leather Jacket
              </h3>
              <p className="text-gray-600 mb-4">
                A high-quality leather jacket designed for style and comfort.
              </p>
              <div className="flex items-center text-lg font-bold text-green-600">
                <span>$199.99</span>
              </div>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img
              src="https://via.placeholder.com/400"
              alt="Product 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Classic Sneakers
              </h3>
              <p className="text-gray-600 mb-4">
                Timeless sneakers for everyday wear.
              </p>
              <div className="flex items-center text-lg font-bold text-green-600">
                <span>$89.99</span>
              </div>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img
              src="https://via.placeholder.com/400"
              alt="Product 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Minimalist Watch
              </h3>
              <p className="text-gray-600 mb-4">
                A sleek and modern watch for the minimalist.
              </p>
              <div className="flex items-center text-lg font-bold text-green-600">
                <span>$149.99</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-16 bg-primary rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Elevate Your Style?
        </h2>
        <p className="text-xl text-blue-100 mb-6">
          Explore our exclusive collection and find the perfect fit for you.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center px-6 py-3 bg-white text-primary text-lg font-semibold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105"
        >
          Shop Now
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Home;