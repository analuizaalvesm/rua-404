import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getCodeApi, validateCodeApi, changePasswordApi, updatePasswordApi } from "../services/ManagementService";
import axios from "axios";

type UserProfile = {
    email: string;
};

type UserContextType = {
    getCode: (email: string) => void;
    validateCode: (email: string, code: string) => Promise<boolean>;
    changePassword: (email: string, password: string) => void;
    updatePassword: (email: string, password: string) => Promise<boolean>;
    user: UserProfile | null;
    token: string | null;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token && user) {
            setToken(token);
            setUser(JSON.parse(user));
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, []);

    const getCode = async (email: string) => {
        console.log("Chegou useManagement linha 42");
        try {
            const response = getCodeApi(email);
            if (response) {
                window.alert(response);
                navigate("/validate-code");
            }
        } catch (e) {
            window.alert("ERRO");
        }

        return { getCode };
    };

    const validateCode = async (email: string, code: string): Promise<boolean> => {
        try {
            const response = await validateCodeApi(email, code);
            return response ? true : false;
        } catch (e) {
            window.alert("ERRO");
            return false;
        }
    };

    const changePassword = async (email: string, password: string) => {
        try {
            const response = await changePasswordApi(email, password);
            if (response) {
                window.alert("Password changed successfully!");
            }
            navigate("/store");
        } catch (e) {
            window.alert("ERRO");
        }
    };

    const updatePassword = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await updatePasswordApi(email, password);
            if (response) {
                window.alert("Password updated successfully!");
                return true;
            }
            return false;
        } catch (e) {
            window.alert("ERRO");
            return false;
        }
    };

    return (
        <UserContext.Provider value={{ getCode, validateCode, changePassword, updatePassword, token, user }}>
            {children}
        </UserContext.Provider>
    );
};

export const useManagement = () => useContext(UserContext);
