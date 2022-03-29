import React from "react";
import { useAuth } from "./auth";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuthADM = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  if (auth.role != "ENS" && auth.role != "ADM" && auth.role != "SEC") {
    console.log("auth.role", auth.role);
    return <Navigate to="/connexion" state={{ path: location.pathname }} />;
  }
  return children;
};
