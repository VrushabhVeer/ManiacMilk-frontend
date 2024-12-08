/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initially null for loading state
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set true if token exists, otherwise false
  }, []);

  if (isAuthenticated === null) {
    // Show a loading indicator while checking authentication
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login with the current location saved
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return Component; // Render the private component
};

export default PrivateRoute;
