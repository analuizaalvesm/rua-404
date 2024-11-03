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

const ProfileSection: FC<ProfileSectionProps> = ({ section }) => {
  const { isAuthenticated, user, logout } = useAuth();
  // const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [editableUser, setEditableUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editableUser) {
      setEditableUser({
        ...editableUser,
        [name]: value,
      });
    }
  };

  const handleSaveChanges = async () => {
    if (
      user &&
      editableUser &&
      JSON.stringify(user) !== JSON.stringify(editableUser)
    ) {
      try {
        await updateUserProfile(editableUser);
        alert("As informações foram atualizadas com sucesso!");
        setUserData({ ...editableUser });
      } catch (error) {
        console.error("Erro ao atualizar as informações:", error);
        alert("Ocorreu um erro ao tentar salvar as alterações.");
      }
    } else {
      alert("Nenhuma alteração foi detectada.");
    }
  };

  const resetEditableUser = () => {
    if (userData) {
      setEditableUser({ ...userData });
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem. Por favor, verifique.");
      return;
    }

    if (editableUser) {
      try {
        await updateUserProfile({ ...editableUser, password: newPassword });
        alert("Senha alterada com sucesso!");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.error("Erro ao alterar a senha:", error);
        alert("Ocorreu um erro ao tentar alterar a senha.");
      }
    }
  };

  switch (section) {
    case "perfil":
      return (
        <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Dados Pessoais</h2>
          <form className="space-y-6">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 mb-2">
                  Primeiro nome
                </label>
                <input
                  type="text"
                  name="first_name"
                  className="border rounded p-2 w-full"
                  value={editableUser?.first_name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 mb-2">Sobrenome</label>
                <input
                  type="text"
                  name="last_name"
                  className="border rounded p-2 w-full"
                  value={editableUser?.last_name || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">E-mail</label>
              <input
                type="email"
                name="email"
                className="border rounded p-2 w-full"
                value={editableUser?.email || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Conta Ativa</label>
              <input
                type="text"
                name="active"
                className="border rounded p-2 w-full"
                value={editableUser?.active ? "Sim" : "Não"}
                readOnly
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveChanges}
                className="bg-white-500 text-white font-semibold rounded px-4 py-2 mr-2"
              >
                Salvar
              </button>
              <button
                type="button"
                className="text-red-500 font-semibold px-4 py-2"
                onClick={resetEditableUser}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      );
    case "endereco":
      return (
        <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Endereço</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Endereço</label>
              <input
                type="text"
                name="address"
                className="border rounded p-2 w-full"
                value={editableUser?.address || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveChanges}
                className="bg-white-500 text-white font-semibold rounded px-4 py-2 mr-2"
              >
                Salvar
              </button>
              <button
                type="button"
                className="text-red-500 font-semibold px-4 py-2"
                onClick={resetEditableUser}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      );
    case "seguranca":
      return (
        <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Segurança</h2>
        </div>
      );
    default:
      return (
        <div className="text-center text-gray-600">Seção não encontrada</div>
      );
  }
};

export default ProfileSection;
