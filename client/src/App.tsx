import Navbar from "./components/Navbar/Navbar";
import Leftbar from "./components/Leftbar/Leftbar";
import Rightbar from "./components/Rightbar/Rightbar";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import React from "react";

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

  const isLoggedIn = false;
  const ProtectedRoute = ({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element => {
    if (!isLoggedIn) return <Navigate to="/login" />;

    // In React, a component can only return a single node.
    // The `children` prop of a component is often an array of nodes, in order
    // to return all of the children, they need to be wrapped in a single node.
    return <>{children}</>; // `<> </>` syntax declares a fragment
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
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
