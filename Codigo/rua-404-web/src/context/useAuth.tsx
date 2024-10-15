import React, { useState, createContext, useEffect, useContext } from "react";
import { UserProfile } from "../models/User";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../services/AuthService";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    register: (email: string, password: string, username: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
}

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token && user) {
            setToken(token);
            setUser(JSON.parse(user));
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        setIsLoggedIn(true);
    }, []);

    const register = async (email: string, password: string, username: string) => {
        await registerApi(email, password, username).then((response) => {
            if(response) {
                localStorage.setItem("token", response?.data.token);
                const userObj = {
                    username: username,
                    email: email,
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(response?.data.token!);
                setUser(userObj!);
                window.alert("User registered successfully!");
                navigate("/store");
            }
        }).catch(e => window.alert("ERRO CADASTRO"));
    };

    const login = async (email: string, password: string) => {
        await loginApi(email, password).then((response) => {
            if(response) {
                localStorage.setItem("token", response?.data.token);
                const userObj = {
                    email: email,
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(response?.data.token!);
                setUser(userObj!);
                window.alert("User logged in successfully!");
                navigate("/store");
            }
        }).catch(e => window.alert("ERRO LOGIN"));
    }

    const isAuthenticated = () => {
        return !!user;
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        navigate("/");
    }
    
    return (
        <UserContext.Provider value={{ login, user, register, token, logout, isAuthenticated }}>
            {isLoggedIn ? children : null}
        </UserContext.Provider>
    )
}

export const useAuth = () => useContext(UserContext);
