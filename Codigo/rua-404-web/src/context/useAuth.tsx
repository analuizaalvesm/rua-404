import React, { useState, createContext, useEffect, useContext } from "react";
import { UserProfile } from "../models/User";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "@/services/AuthService";
import { getUserProfile } from "@/services/ProfileService";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  userId: number | null;
  setUser: (user: UserProfile) => void;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<UserProfile | null>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null
  );
  const [userId, setUserId] = useState<number | null>(null);
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

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    await registerApi(firstName, lastName, email, password)
      .then((response) => {
        if (response) {
          if (response?.data.token) {
            localStorage.setItem("token", response.data.token);
          }
          const userObj = {
            firstName: firstName,
            lastName: lastName,
            email: email,
          };
          console.log(userObj);
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(response?.data.token!);
          setUser(userObj!);
          window.alert("User registered successfully!");
          navigate("/store");
        }
      })
      .catch((e) => window.alert("ERRO CADASTRO"));
  };

  const login = async (email: string, password: string) => {
    await loginApi(email, password)
      .then((response) => {
        if (response) {
          if (response?.data.token) {
            localStorage.setItem("token", response?.data.token);
          }
          const userObj = {
            email: email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(response?.data.token!);
          setUser(userObj!);
          window.alert("User logged in successfully!");
          navigate("/store");
        }
      })
      .catch((e) => window.alert("ERRO LOGIN"));
  };

  const getUserInfo = async () => {
    await getUserProfile(user?.email!)
      .then((response) => {
        if (response) {
          setUserId(response.customer_id);
        }
      })
      .catch((e) => window.alert("ERRO GET USER INFO"));
  };

  useEffect(() => {
    if (user) {
      getUserInfo();
    }
  }, [user]);

  const isAuthenticated = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        login,
        user,
        setUser,
        register,
        token,
        logout,
        isAuthenticated,
        userId,
      }}
    >
      {isLoggedIn ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
