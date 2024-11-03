import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCodeApi,
  validateCodeApi,
  changePasswordApi,
} from "../services/ManagementService";
import axios from "axios";

type UserProfile = {
  email: string;
};

type UserContextType = {
  getCode: (email: string) => void;
  validateCode: (code: string) => Promise<boolean>;
  changePassword: (email: string, password: string) => void;
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

  const validateCode = async (code: string): Promise<boolean> => {
    try {
      const response = await validateCodeApi(code);
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

  return (
    <UserContext.Provider
      value={{ getCode, validateCode, changePassword, token, user }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useManagement = () => useContext(UserContext);
