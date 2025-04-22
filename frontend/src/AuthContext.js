import React, { createContext, useContext, useState } from "react";
// import {logoutApi} from "";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token"));
    const [userRole, setUserRole] = useState(localStorage.getItem("role"));

    const login = (token, role,username) => {
        localStorage.setItem("access_token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        setIsAuthenticated(true);
        setUserRole(role);
        console.log("day la username kkkk", username)
    };

    const logout = () => {
        // logoutApi();
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        sessionStorage.removeItem("chatHistory")
        setIsAuthenticated(false);
        setUserRole(null);
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
