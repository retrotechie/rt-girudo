import Navbar from "./components/Navbar/Navbar";
import Leftbar from "./components/Leftbar/Leftbar";
import Rightbar from "./components/Rightbar/Rightbar";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

function App(): JSX.Element {
  // Use PascalCase for component names, got error with `layout`
  const Layout = (): JSX.Element => {
    // `Outlet` renders child route elements e.g. `Home`, `Profile`
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Leftbar />
          <Outlet />
          <Rightbar />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
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
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
