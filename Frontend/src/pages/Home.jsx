import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SecondaryButton } from "../components/Button";
import { useUser } from "../contexts/userContext";


const Header = ({ user, handleLogout }) => {
  return (
    <div className="container mx-auto flex items-center justify-between w-full">
      <div>
        <h2 className="text-2xl font-bold">Welcome, {user.first_name} {user.last_name}!</h2>
        <p>Email: {user.email}</p>
      </div>
      <SecondaryButton text="Log out" onClick={handleLogout} />
    </div>
  )
};


const Home = () => {
  const { user, logoutUser, loading } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user && <Header user={user} handleLogout={logoutUser} />}
    </div>
  );
};

export default Home;