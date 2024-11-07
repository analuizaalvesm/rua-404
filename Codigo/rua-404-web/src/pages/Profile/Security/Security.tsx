import { FC, useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "@/services/ProfileService";
import { useAuth } from "@/context/useAuth";

type User = {
  customer_id: number;
  store_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  active: boolean;
  create_data?: string;
  last_update?: string;
  password?: string;
  recuperationCode?: string;
  dataSendCode?: string;
  loginToken?: string;
  code?: string;
  sendCode?: string;
  codeExpiration?: string;
};

type ProfileSectionProps = {
  section: "perfil" | "endereco" | "seguranca";
};

const Security = () => {
  const { user } = useAuth();
  // const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [editableUser, setEditableUser] = useState<User | null>(null);

  console.log("user logado", user);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile(user?.email || "");
        console.log(userData);
        if (userData) {
          setUserData(userData);
          setEditableUser({ ...userData });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Segurança</h1>
    </div>
  );
};

export default Security;
