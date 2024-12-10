import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "@/services/ProfileService";
import { useAuth } from "@/context/useAuth";
import { User } from "@/models/User";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [editableUser, setEditableUser] = useState<User | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log("user?.email", user?.email);
        const userData = await getUserProfile(user?.email || "");
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

    if (name == "cpf") {
      setMask("###.###.###-##", e);
    }

    if (name == "telefone") {
      setMask("(##) #####-####", e);
    }
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfilePictureUrl(imageUrl);
      if (editableUser) {
        setEditableUser({ ...editableUser, profilePicture: imageUrl });
      }
    }
  };

  const handleSaveChanges = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      user &&
      editableUser &&
      JSON.stringify(user) !== JSON.stringify(editableUser)
    ) {
      try {
        const updatedUser = await updateUserProfile(editableUser);
        if (updatedUser) {
          setUserData({ ...editableUser });
          const userObj = {
            email: editableUser.email,
            firstName: editableUser.first_name,
            lastName: editableUser.last_name,
            dataNascimento: editableUser.dataNascimento,
            cpf: editableUser.cpf,
            telefone: editableUser.telefone,
          };

          setUser(userObj);
          localStorage.setItem("user", JSON.stringify(userObj));

          alert("As informações foram atualizadas com sucesso!");
        }
      } catch (error) {
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

  const setMask = (
    mascara: string,
    documento: React.ChangeEvent<HTMLInputElement>
  ) => {
    let valor = documento.target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    let i = 0;
    let valorFormatado = mascara.replace(/#/g, () => valor[i++] || "");
    if (editableUser)
      setEditableUser({
        ...editableUser,
        [documento.target.name]: valorFormatado,
      });
  };

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h2 className="text-xl font-medium font-orbitron-regular mb-1">
          Meu perfil
        </h2>
        <p className="text-sm text-gray-500 font-regular">
          Aqui estão as informações básicas da sua conta. Atualize seus dados
          quando quiser.{" "}
        </p>
      </div>
      <form className="space-y-6">
        <div className="flex flex-row items-center bg-white border border-gray-300 rounded-sm p-4 space-x-4">
          {profilePictureUrl ? (
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl">
              {editableUser?.first_name?.[0].toUpperCase() || ""}
            </div>
          )}
          <div>
            <input
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 focus:outline-none pr-3
              file:mr-3 file:py-1.5 file:px-2 file:rounded-sm file:border-0 file:text-[14px] file:font-medium file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-100"
              id="file_input"
              type="file"
              onChange={handleProfilePictureChange}
            />
            <p
              className="mt-1 text-xs text-gray-400 dark:text-gray-300"
              id="file_input_help"
            >
              Pelo menos 800x800 px recomendado.
              <br />
              JPG ou PNG é permitido.
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between space-x-2">
          <div className="w-full">
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              name="first_name"
              value={editableUser?.first_name || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Nome"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="sobrenome"
              className="block text-sm font-medium text-gray-700"
            >
              Sobrenome
            </label>
            <input
              type="text"
              name="last_name"
              value={editableUser?.last_name || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Sobrenome"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            E-mail
          </label>
          <input
            type="email"
            name="email"
            value={editableUser?.email || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="email@exemplo.com"
          />
        </div>
        <div className="w-3/6 pr-1">
          <label
            htmlFor="dataNascimento"
            className="block text-sm font-medium text-gray-700"
          >
            Data de nascimento
          </label>
          <input
            type="date"
            id="data"
            name="dataNascimento"
            value={editableUser?.dataNascimento || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="w-3/6 pr-1">
          <label
            htmlFor="cpf"
            className="block text-sm font-medium text-gray-700"
          >
            CPF
          </label>
          <input
            type="text"
            name="cpf"
            value={editableUser?.cpf || ""}
            onChange={handleInputChange}
            maxLength={14}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="123.456.789-00"
          />
        </div>
        <div className="w-3/6 pr-1">
          <label
            htmlFor="telefone"
            className="block text-sm font-medium text-gray-700"
          >
            Celular
          </label>
          <input
            type="text"
            name="telefone"
            value={editableUser?.telefone || ""}
            onChange={handleInputChange}
            maxLength={15}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="(11) 99999-9999"
          />
        </div>
        <div className="flex flex-row gap-2 pt-2">
          <button
            type="submit"
            onClick={handleSaveChanges}
            className="bg-black text-white text-sm px-6 py-2.5 rounded-sm hover:bg-gray-800"
          >
            Salvar
          </button>
          <button
            type="submit"
            onClick={resetEditableUser}
            className="text-red-500 text-sm px-4 py-2 bg-transparent hover:underline"
          >
            Descartar alterações
          </button>
        </div>
      </form>

      <svg
        className="mt-9 w-full"
        width="1216"
        height="0"
        viewBox="0 0 1216 2"
        fill="none"
      >
        <path d="M0 1H1216" stroke="#D1D5DB" />
      </svg>
    </div>
  );
};

export default Profile;
