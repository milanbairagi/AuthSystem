import { Link } from "react-router-dom";

import { SecondaryButton } from "../components/Button";
import { useUser } from "../contexts/userContext";


const Home = () => {
  const { user, logoutUser, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h2 className="text-2xl font-bold">Welcome, {user.first_name} {user.last_name}!</h2>
          <p>Email: {user.email}</p>
          <SecondaryButton text="Log out" onClick={logoutUser} />
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