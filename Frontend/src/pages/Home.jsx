import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import api from "../api";
import { getTokens, clearTokens } from "../tokens";
import { SecondaryButton } from "../components/Button";


const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { accessToken } = getTokens();
    if (!accessToken) {
      return;
    }

    const getUser = async () => {
      try {
        const res = await api.get("/accounts/me/");
        setUser(res.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setUser(null);
          clearTokens();
        }
      }
    };

    getUser();
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
  });

  
  return (
    <div>
      {user ? (
        <div>
          <h2 className="text-2xl font-bold">Welcome, {user.first_name} {user.last_name}!</h2>
          <p>Email: {user.email}</p>
          <SecondaryButton text="Log out" onClick={logout} />
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold">Welcome to the Home Page</h2>
          <p>Please log in to see your details.</p>
          <Link to="/login" className="text-blue-500 underline">Go to Login</Link>
          <br />
          <Link to="/register" className="text-blue-500 underline">Go to Register</Link>
        </div>
      )}
    </div>
    
  );
};

export default Home;