/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../common/Loader";

const PrivateRoute = ({ element: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  console.log("PrivateRoute location state: private route", location.state);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return Component;
};

export default PrivateRoute;
