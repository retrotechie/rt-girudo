import Navbar from "./components/Navbar/Navbar";
import Leftbar from "./components/Leftbar/Leftbar";
import Rightbar from "./components/Rightbar/Rightbar";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";

import { DarkModeContext } from "./context/DarkMode";
import { AuthContext } from "./context/Auth";

import "./style.scss";

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import React, { useContext } from "react";

function App(): JSX.Element {
  const { darkMode } = useContext(DarkModeContext);

  // Use PascalCase for component names, got error with `layout`
  const Layout = (): JSX.Element => {
    // `Outlet` renders child route elements e.g. `Home`, `Profile`
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Leftbar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </div>
    );
  };

  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element => {
    if (!currentUser) return <Navigate to="/login" />;

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
        {
          path: "/profile/:id",
          element: <Profile />,
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
