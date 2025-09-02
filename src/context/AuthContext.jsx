import React, { createContext, useContext, useState, useEffect } from "react";
// import React from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check auth when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          "https://shortly-backend-amcp.onrender.com/me",
          {
            credentials: "include", // send cookies
          }
        );

        if (res.ok) {
          const data = await res.json();
          setUser(data.user); // save user from backend
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
