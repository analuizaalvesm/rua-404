import React, { useState, createContext, useEffect, useContext } from "react";
import { UserProfile } from "../models/User";
import { useNavigate } from "react-router-dom";
import { getCodeApi, validateCodeApi, changePasswordApi, updatePasswordApi } from "../services/RecoverPasswordService";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    getCode: (email: string) => void;
    validateCode: (email: string, code: string) => Promise<boolean>;
    changePassword: (email: string, password: string) => void;
    updatePassword: (email: string, password: string) => Promise<boolean>;
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

    const getCode = async (email: string) => {
        await getCodeApi(email).then((response) => {
            if(response) {
                window.alert("Code sent successfully!");
            }
            navigate("/store");
        }).catch(e => window.alert("ERRO"));
    }

    const validateCode = async (email: string, code: string) => {
        await validateCodeApi(email, code).then((response) => {
            if(response) {
                return true;
            }
        }).catch(e => window.alert("ERRO"));
        return false;
    }

    const changePassword = async (email: string, password: string) => {
        await changePasswordApi(email, password).then((response) => {
            if(response) {
                window.alert("Password changed successfully!");
            }
            navigate("/store");
        }).catch(e => window.alert("ERRO"));
    }

    const updatePassword = async (email: string, password: string) => {
        await updatePasswordApi(email, password).then((response) => {
            if(response) {
                window.alert("Password updated successfully!");
                return true;
            }
        }).catch(e => window.alert("ERRO"));
        return false;
    }
    
    return (
        <UserContext.Provider value={{ getCode, user, validateCode, token, changePassword, updatePassword }}>
            {isLoggedIn ? children : null}
        </UserContext.Provider>
    )
}

export const useRecoverPassword = () => useContext(UserContext);
