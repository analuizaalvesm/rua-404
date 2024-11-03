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

const EditProfile = () => {
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

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Editar Perfil</h1>
      <form className="space-y-6">
        {/* Nome do Job */}
        <div>
          <label
            htmlFor="nome-job"
            className="block text-sm font-medium text-gray-700"
          >
            Nome do Job
          </label>
          <input
            type="text"
            id="nome-job"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ex.: Recepção para evento corporativo"
          />
        </div>
        <div>
          <label
            htmlFor="descricao-job"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição
          </label>
          <textarea
            id="descricao-job"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={4}
            placeholder="Descreva as responsabilidades, requisitos e outros detalhes importantes..."
          />
        </div>
        <div>
          <label
            htmlFor="local-job"
            className="block text-sm font-medium text-gray-700"
          >
            Local
          </label>
          <input
            type="text"
            id="local-job"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ex.: Belo Horizonte, MG"
          />
        </div>
        <div>
          <label
            htmlFor="remuneracao-job"
            className="block text-sm font-medium text-gray-700"
          >
            Remuneração (R$)
          </label>
          <input
            type="number"
            id="remuneracao-job"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ex.: 700"
          />
        </div>
        <div>
          <label
            htmlFor="vagas-job"
            className="block text-sm font-medium text-gray-700"
          >
            Número de vagas
          </label>
          <input
            type="number"
            id="vagas-job"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ex.: 4"
          />
        </div>
        <div>
          <label
            htmlFor="data-job"
            className="block text-sm font-medium text-gray-700"
          >
            Data do Job
          </label>
          <input
            type="date"
            id="data-job"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Criar Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
