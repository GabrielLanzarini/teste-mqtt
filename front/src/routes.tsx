import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";

const Routes = () => {
  return <RouterProvider router={router} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
]);

export default Routes;
