
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

import JobDashboard from './JobDashboard';
import InternDashboard from './InternDashboard';
import AdminCourse from './AdminCourse';
import User from './setting/User';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const [active, setActive] = useState("job");
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => setToggle(!toggle);

  const delay = (d) => new Promise((res) => setTimeout(res, d * 500));

  const handleLogout = async () => {
    await delay(1);
    try {
      await axios.get("https://appjob-o3ho.onrender.com/api/logout", {
        withCredentials: true
      });
      localStorage.removeItem("token");
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed, try again!");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    await delay(1);
    try {
      const res = await fetch('https://appjob-o3ho.onrender.com/api/login', {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user.username || "Admin");
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 relative">
  
      {/* Top Bar for Mobile */}
      <div className="lg:hidden bg-blue-600 text-white flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <button onClick={handleClick} className="bg-white text-blue-600 px-3 py-1 rounded shadow">
          {toggle ? "Close" : "Menu"}
        </button>
      </div>
  
      {/* Backdrop when sidebar is open on mobile */}
      {toggle && (
        <div
          onClick={() => setToggle(false)}
          className="fixed inset-0 bg-black opacity-30 z-20 lg:hidden"
        ></div>
      )}
  
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-30 transform top-0 left-0 h-full w-64 bg-blue-600 text-white p-4 transition-transform duration-300 ease-in-out ${
          toggle ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="space-y-3 mt-4 lg:mt-0">
          {["job", "intern", "skills", "user"].map((item) => (
            <div
              key={item}
              onClick={() => {
                setActive(item);
                setToggle(false); // auto-close on mobile
              }}
              className={`px-4 py-2 rounded cursor-pointer hover:bg-white hover:text-blue-600 transition ${
                active === item ? "bg-white text-blue-600 font-semibold" : ""
              }`}
            >
              {item === "job" && "Job Post"}
              {item === "intern" && "Internship Post"}
              {item === "skills" && "Course Post"}
              {item === "user" && "Profile"}
            </div>
          ))}
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 hover:bg-red-600 w-full py-2 rounded text-white font-semibold transition"
          >
            Log Out
          </button>
        </nav>
      </aside>
  
      {/* Main Content */}
      <main className="flex-1 p-6 z-10">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <p className="text-gray-700 text-sm sm:text-base mt-2 sm:mt-0">
            Welcome 👋 {user || "Loading..."}
          </p>
        </div>
  
        <div className="bg-white p-6 rounded-xl shadow-md min-h-[60vh]">
          {active === "job" && <JobDashboard />}
          {active === "intern" && <InternDashboard />}
          {active === "skills" && <AdminCourse />}
          {active === "user" && <User />}
        </div>
      </main>
    </div>
  );
  
}

export default AdminDashboard;
