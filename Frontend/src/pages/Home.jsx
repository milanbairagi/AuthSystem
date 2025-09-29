import { useState, useEffect } from "react";

import api from "../api";


const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("/accounts/me/");
        console.log("User data:", res.data);
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    getUser();
  }, []);

  
  return (
    <div>
      <h1>Home Page</h1>
      {user && (
        <div>{JSON.stringify(user)}</div>
      )}
    </div>
    
  );
};

export default Home;