import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://portfolio-backend-shweta-kohad.onrender.com/api/portfolio/admin-login",
        user
      );
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data.token);
        navigate("/admin");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#495774] to-[#1f456b]">
      <div className="w-96 flex flex-col gap-5 p-5 shadow border border-gray-500 bg-white">
        <h1 className="text-2xl">Portfolio Admin-Login</h1>
        <hr />
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          className="px-10 py-3 bg-gradient-to-r from-[#3d4659] to-[#1f456b] text-white"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
