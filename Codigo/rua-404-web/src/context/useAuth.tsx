import React, { useState, createContext, useEffect, useContext } from "react";
import { UserProfile } from "../models/User";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "@/services/AuthService";
import { getUserProfile } from "@/services/ProfileService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  role: string | null;
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
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setToken(token || null);
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
          toast.success("Cadastro realizado com sucesso!", {
            position: "top-center",
          });
          navigate("/store");
        }
      })
      .catch(() =>
        toast.error("Erro ao realizar cadastro!", { position: "top-center" })
      );
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await loginApi(email, password);

      if (response?.data) {
        const { token, role } = response.data;
        if (token) {
          localStorage.setItem("token", token);
        }
        if (role) {
          localStorage.setItem("role", role);
        } else {
          localStorage.setItem("role", "USER");
        }

        setToken(token || null);
        setRole(role);

        const userObj = { email };
        localStorage.setItem("user", JSON.stringify(userObj));
        setUser(userObj);

        if (role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/store");
        }

        toast.success("Login realizado com sucesso!", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Erro ao realizar login!", { position: "top-center" });
    }
  };

  const getUserInfo = async () => {
    await getUserProfile(user?.email!)
      .then((response) => {
        if (response) {
          setUserId(response.customer_id);
        }
      })
      .catch(() => window.alert("ERRO GET USER INFO"));
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
        role,
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
