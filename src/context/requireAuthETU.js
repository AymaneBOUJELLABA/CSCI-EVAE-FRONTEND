import React from "react";
import { useAuth } from "./auth";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuthETU = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  if (auth.role != "ETU") {
    console.log("auth", auth);
    return <Navigate to="/connexion" state={{ path: location.pathname }} />;
  }

  return children;
};
