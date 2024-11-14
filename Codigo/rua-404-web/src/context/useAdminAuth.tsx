import { AdminProfile } from "@/models/Admin";
import { createContext } from "react";

type AdminContextType = {
  admin: AdminProfile | null;
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
};

type Props = { children: React.ReactNode };

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export const AdminProvider = ({ children }: Props) => {
  return (
    <AdminContext.Provider
      value={{
        admin: null,
        token: null,
        register: () => {},
        login: () => {},
        logout: () => {},
        isAuthenticated: () => false,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
