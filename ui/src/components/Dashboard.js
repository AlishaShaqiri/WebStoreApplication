import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCurrentUser, isAuthenticated } from '../services/authService';
import { FaDollarSign, FaChartBar, FaExclamationCircle, FaSpinner } from 'react-icons/fa';

function Dashboard() {
  const [userRole, setUserRole] = useState('');
  const [reports, setReports] = useState({ daily: null, monthly: null, topSelling: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:5000/api/reports';

  const fetchReports = async () => {
    if (!isAuthenticated()) {
      setError('You are not logged in.');
      window.location.href = '/products';
      setLoading(false);
      return;
    }

    const user = getCurrentUser();
    setUserRole(user?.role || '');

    if (user && (user.role === 'Admin' || user.role === 'Advanced User')) {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: token } };

        const [dailyResponse, monthlyResponse, topSellingResponse] = await Promise.all([
          axios.get(`${API_URL}/daily`, config),
          axios.get(`${API_URL}/monthly`, config),
          axios.get(`${API_URL}/top-selling`, config),
        ]);

        setReports({
          daily: dailyResponse.data,
          monthly: monthlyResponse.data,
          topSelling: topSellingResponse.data,
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while fetching reports.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('You do not have permission to view these reports.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-10">
      <header className="flex items-center justify-between">
        <h2 className="text-4xl font-bold text-gray-800">Dashboard</h2>
        <span className="text-sm text-gray-500">
          Welcome, <span className="font-medium text-gray-700">{userRole}</span>
        </span>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-20">
          <FaSpinner className="animate-spin text-3xl text-gray-500" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center text-red-500 space-x-2">
          <FaExclamationCircle className="text-2xl" />
          <span className="text-lg font-medium">{error}</span>
        </div>
      ) : userRole === 'Admin' || userRole === 'Advanced User' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.daily && (
            <ReportCard
              icon={<FaDollarSign className="text-3xl text-green-500" />}
              title="Daily Report"
              amount={reports.daily.total_earnings}
            />
          )}

          {reports.monthly && (
            <ReportCard
              icon={<FaChartBar className="text-3xl text-blue-500" />}
              title="Monthly Report"
              amount={reports.monthly.total_earnings}
            />
          )}

          {reports.topSelling.length > 0 ? (
            <div className="col-span-full">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Top Selling Products</h3>
              <ul className="space-y-4">
                {reports.topSelling.map((product, index) => (
                  <li key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <p className="text-lg font-semibold text-gray-800">{product.name}</p>
                    <p className="text-gray-600">Total Sold: <span className="font-bold">{product.total_sold}</span></p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-center text-gray-500">No top-selling products available.</p>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center text-red-500 space-x-2">
          <FaExclamationCircle className="text-2xl" />
          <span className="text-lg font-medium">You do not have access to view reports.</span>
        </div>
      )}
    </div>
  );
}

function ReportCard({ icon, title, amount }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center space-x-4">
      <div className="p-3 rounded-full bg-gray-100">{icon}</div>
      <div>
        <h4 className="text-xl font-semibold text-gray-700">{title}</h4>
        <p className="text-lg font-medium">
          Total Earnings: <span className="text-green-600 font-bold">${amount}</span>
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
