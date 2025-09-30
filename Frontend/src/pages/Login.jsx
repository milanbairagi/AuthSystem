import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api";
import { useUser } from "../contexts/userContext";
import FormField from "../components/FormField";
import PrimaryButton from "../components/Button";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, loginUser, logoutUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to home
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    logoutUser();

    try {
      setLoading(true);
      const res = await api.post("v1/token/", { email, password });
      await loginUser(res.data);
      navigate("/");

    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
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

        <PrimaryButton text="Login" type="submit" loading={loading} loadingText="Logging in..." />

      </form>

      <p className="text-gray-500">Don't have an account? <Link to="/register" className="text-blue-500 underline">Register</Link></p>
    </div>
  )
};

export default Login;