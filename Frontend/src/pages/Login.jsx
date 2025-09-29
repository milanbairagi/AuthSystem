import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api";
import { setTokens, clearTokens } from "../tokens";
import FormField from "../components/FormField";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    clearTokens();

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

        {/* Email */}
        <FormField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <FormField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Login
        </button>

      </form>
    </div>
  )
};

export default Login;