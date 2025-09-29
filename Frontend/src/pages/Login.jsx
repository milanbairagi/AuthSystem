import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api";
import { setTokens } from "../tokens";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/token/", { email, password });
      console.log("Login successful:", res.data);
      setTokens(res.data.access, res.data.refresh);
      navigate("/");

    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold">Login Page</h2>
      <form onSubmit={handleSubmit} className="space-y-2">

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            className="border border-gray-800 px-2 py-1 ml-2 rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            className="border border-gray-800 px-2 py-1 ml-2 rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Login
        </button>

      </form>
    </div>
  )
};

export default Login;