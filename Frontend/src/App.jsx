import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { UserProvider } from "./contexts/userContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";


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
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
