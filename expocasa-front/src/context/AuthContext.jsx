import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] =
    useState(JSON.parse(localStorage.getItem("user"))) || {};
    
    const svHost = import.meta.env.VITE_HOST;

    const login = async (data) => {
        try {
            const loginData = await axios.post(`${svHost}/login`, data);
            localStorage.setItem("user", JSON.stringify(loginData.data.user));
            toast.success("Ingreso exitoso! Redirigiendo...", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              window.location.href = "/admin";
              setUser(loginData.data.user);
            }, 2000);
          } catch (error) {
            console.log(error)
            const status = error.response ? error.response.status : null;
            if (status === 404) {
              toast.error("Usuario o contraseña incorrectos.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
              toast.error("Ha habido un error.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          }
    }

    const logout = () => {
      window.location.href = "/";
      setUser(null);
      localStorage.removeItem("user");
    };

    const auth = {
        login,
        logout,
        user,
    };

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};