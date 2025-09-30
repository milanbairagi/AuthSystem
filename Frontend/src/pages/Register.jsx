import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api";
import { useUser } from "../contexts/userContext";
import FormField from "../components/FormField";
import PrimaryButton from "../components/Button"


const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, logoutUser } = useUser();
  
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to home
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Ensure logged out before registering a new user
    logoutUser();

    try {
      setLoading(true);
      const res = await api.post("/accounts/register/", { 
        first_name: firstName, 
        last_name: lastName, 
        email, 
        password 
      });
      console.log("Registration successful:", res.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <h2 className="text-2xl font-bold">Register Page</h2>
      <form onSubmit={handleRegister} className="space-y-2">

        {/* First Name */}
        <FormField
          id="firstName"
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        {/* Last Name */}
        <FormField
          id="lastName"
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

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

        <PrimaryButton text="Register" type="submit" loading={loading} loadingText="Registering..." />

      </form>

      <p className="text-gray-500">Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link></p>

    </div>
  )
};

export default Register;