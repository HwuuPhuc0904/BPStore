
import React, { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [userRole, setUserRole] = useState(localStorage.getItem("role"));
    const [username, setUsername] = useState(localStorage.getItem("username"));


    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const username = localStorage.getItem("username");
       
        if (token) {
            setIsAuthenticated(true);
            setUserRole(role);
            setUsername(username);
        } else {
            setIsAuthenticated(false);
            setUserRole(null)
            setUsername(null)
        }
    }, [])

    const login = (token, role,username) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        setIsAuthenticated(true);
        setUserRole(role);
        setUsername(username);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        sessionStorage.removeItem("username");
        setIsAuthenticated(false);
        setUserRole(null);
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
