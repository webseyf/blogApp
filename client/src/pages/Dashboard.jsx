import React, { useEffect, useState } from 'react';
import "../styles/Dashboard.css";
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import PostList from './PostList';

const Dashboard = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    let axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.get("http://localhost:3000/api/v1/dashboard", axiosConfig);
      setData({ msg: response.data.msg, luckyNumber: response.data.secret });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    if (token === "") {
      navigate("/login");
      toast.warn("Please login first to access the dashboard");
    }
  }, [token]);

  return (
    <div className="dashboard-main">
      <h1>Dashboard</h1>
      <p>Welcome back</p>
      <div className="dashboard-actions">
        
       
      </div>
    
      <PostList />  {/* Displays the list of posts */}
    </div>
  );
};

export default Dashboard;
