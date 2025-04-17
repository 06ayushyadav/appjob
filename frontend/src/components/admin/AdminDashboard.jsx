import React from 'react'
import './AdminDashboard.css';

import JobDashboard from './JobDashboard'
import InternDashboard from './InternDashboard'
import AdminCourse from './AdminCourse'
import User from './setting/User'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function AdminDashboard() {
  const [active, setActive] = useState(null)
  const [toggle, setToggle] = useState(true)

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    setToggle(!toggle)
  }

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 500)
    })
  }

  const handleLogout = async () => {
    await delay(1)

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
    await delay(1)
    try {
      const user = await fetch('https://appjob-o3ho.onrender.com/api/login', {
        method: "GET",
        credentials: "include",
      });

      const data = await user.json();
      if (data.success) {
        setUser(data.user.username || "Admin");
      } else {
        console.log(data.user);
      }
    } catch (error) {
      console.log("Error fetching jobs:", error)
    }
  }


  return (
    <>

      <div className="admin-dashboard bg-blue-300 min-h-screen">
        {/* <aside className="sidebar bg-blue-300">
        <button onClick={handleClick}>{toggle ? <h2 className='bg-blue-500 font-bold text-sm sm:text-base md:text-lg rounded-md px-1 py-1 sm:px-2 sm:py-1  md:px-3 md:py-1 '>Menu</h2> : 'Menu ⇶'}
        </button>
        {toggle && (
          <ul className='text-sm sm:text-base md:text-lg'>
            <li className='hover:cursor-pointer hover:bg-white hover:text-blue-600 font-normal rounded-sm w-fit px-1   ' onClick={() => setActive("job")}>Job Post</li>
            <li className='hover:cursor-pointer hover:bg-white hover:text-blue-600 font-normal rounded-sm w-fit px-1  ' onClick={() => setActive("intern")}>Internship Post</li>
            <li className='hover:cursor-pointer hover:bg-white hover:text-blue-600 font-normal rounded-sm w-fit px-1  ' onClick={() => setActive("skills")}>Course Post </li>
            <li className='hover:cursor-pointer hover:bg-white hover:text-blue-600 font-normal rounded-sm w-fit px-1  ' onClick={() => setActive("user")}>Profile </li>

            <li><button className="bg-red-600 text-white px-1 py-1 rounded-md text-sm sm:text-base md:text-lg sm:px-2 sm:py-1  md:px-3 md:py-1 mt-5 "
              onClick={handleLogout}>Log out</button></li>

          </ul>
        )}

       </aside> */}

        <div className=''>
          <aside className="sidebar bg-blue-300">
            <button onClick={handleClick}>{toggle ? <h2 className='bg-blue-500 font-bold text-sm sm:text-base md:text-lg rounded-md px-1 py-1 sm:px-2 sm:py-1  md:px-3 md:py-1 '>Menu</h2> : 'Menu ⇶'}
            </button>
            {toggle && (
              <ul className='text-sm sm:text-base md:text-lg'>
                <li className='hover:cursor-pointer hover:bg-white hover:text-blue-600 font-normal rounded-sm w-fit px-1   ' onClick={() => setActive("job")}>Job Post</li>
                <li className='hover:cursor-pointer hover:bg-white hover:text-blue-600 font-normal rounded-sm w-fit px-1  ' onClick={() => setActive("intern")}>Internship Post</li>
                <li className='hover:cursor-pointer hover:bg-white hover:text-blue-600 font-normal rounded-sm w-fit px-1  ' onClick={() => setActive("skills")}>Course Post </li>
                <li className='hover:cursor-pointer hover:bg-white hover:text-blue-600 font-normal rounded-sm w-fit px-1  ' onClick={() => setActive("user")}>Profile </li>

                <li><button className="bg-red-600 text-white px-1 py-1 rounded-md text-sm sm:text-base md:text-lg sm:px-2 sm:py-1  md:px-3 md:py-1 mt-5 "
                  onClick={handleLogout}>Log out</button></li>

              </ul>
            )}

          </aside>
        </div>

        <main className="main-content w-full h-full">
          <header className="header flex justify-between">
            <h1>Admin Dashboard </h1>
            <span className='text-sm sm:text-xs md:text-base'> Welcome 👋 {user || "Loading..."} </span>
          </header>
          {active === "job" && <JobDashboard />}
          {active === "intern" && <InternDashboard />}
          {active === "skills" && <AdminCourse />}
          {active === "user" && <User />}


        </main>
      </div>


    </>
  )
}

export default AdminDashboard  
