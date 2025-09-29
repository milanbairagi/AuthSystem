import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Login from "./pages/Login";
import Register from "./pages/Register";


const Home = () => {
  return (
    <div>Home Page</div>
  );
};


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
