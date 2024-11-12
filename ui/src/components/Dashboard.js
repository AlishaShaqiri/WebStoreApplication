import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCurrentUser, isAuthenticated } from '../services/authService';

function Dashboard() {
  const [userRole, setUserRole] = useState('');
  const [dailyReport, setDailyReport] = useState(null);
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [topSelling, setTopSelling] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/reports';

  const fetchReports = async () => {
    if (!isAuthenticated()) {
      setError('You are not logged in.');
      window.location.href = '/products'
      setLoading(false);
      return;
    }

    const user = getCurrentUser();
    if (user) {
      setUserRole(user.role);


      if (user.role === 'Admin' || user.role === 'Advanced User') {
        setLoading(true);
        setError(null);

        const config = {
          headers: { Authorization: `${localStorage.getItem('token')}` },
        };

        try {

          const [dailyResponse, monthlyResponse, topSellingResponse] = await Promise.all([
            axios.get(`${API_URL}/daily`, config),
            axios.get(`${API_URL}/monthly`, config),
            axios.get(`${API_URL}/top-selling`, config),
          ]);

          setDailyReport(dailyResponse.data);
          setMonthlyReport(monthlyResponse.data);
          setTopSelling(topSellingResponse.data);
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
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

      {loading && <p className="text-center text-lg text-gray-500">Loading...</p>}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}

      {(userRole === 'Admin' || userRole === 'Advanced User') ? (
        <div className="space-y-8">
          {dailyReport && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-700">Daily Report</h3>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="text-lg">Total Earnings: <span className="font-bold">${dailyReport.total_earnings}</span></p>
              </div>
            </div>
          )}

          {monthlyReport && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-700">Monthly Report</h3>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="text-lg">Total Earnings: <span className="font-bold">${monthlyReport.total_earnings}</span></p>
              </div>
            </div>
          )}

          {topSelling.length > 0 ? (
            <div>
              <h3 className="text-2xl font-semibold text-gray-700">Top Selling Products</h3>
              <ul className="space-y-4">
                {topSelling.map((product, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <p className="font-semibold">{product.name}</p>
                    <p>Total Sold: {product.total_sold}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">No top-selling products available.</p>
          )}
        </div>
      ) : (

        <p className="text-red-500">You do not have access to view reports.</p>
      )}
    </div>
  );
}

export default Dashboard;
