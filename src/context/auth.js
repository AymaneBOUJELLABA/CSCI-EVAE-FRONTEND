import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pseudo, setPseudo] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(null);
  const [noEtudiant, setNoEtudiant] = useState(null);

  const login = (email, password, pseudo, role, noEtudiant) => {
    //setUser({ email: email, password: password, pseudo: pseudo, role: role });
    setUser(email);
    setPassword(password);
    setPseudo(pseudo);
    setRole(role);
    setNoEtudiant(noEtudiant);
    console.log("logged in ", user);
    console.log("children", children);
  };

  const logout = () => {
    setUser(null);
    setPassword(null);
    setPseudo(null);
    setRole(null);
    setNoEtudiant(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, password, pseudo, noEtudiant ,role, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
