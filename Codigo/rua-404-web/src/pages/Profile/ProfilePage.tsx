import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { deleteUserProfile } from "@/services/ProfileService";

const ProfilePage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerId, setCustomerId] = useState<number | null>(null);

  const openDeleteModal = (id: number) => {
    setCustomerId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCustomerId(null);
  };

  const handleDeleteAccount = async () => {
    if (customerId) {
      const success = await deleteUserProfile(customerId);
      if (success) {
        alert("Sua conta foi deletada com sucesso.");

        setCustomerId(null);
        setShowDeleteModal(false);
      } else {
        alert("Ocorreu um erro ao tentar deletar a conta.");
      }
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-1">Minha conta</h1>
      <p className="text-gray-600 mb-8">
        Gerencie as configurações da sua conta e defina as suas preferências.
      </p>

      <div className="flex bg-gray-100 rounded-lg shadow w-full">
        {/* Menu lateral */}
        <aside className="w-1/4 bg-gray-200 p-6 rounded-l-lg">
          <ul>
            <li className="mb-4">
              <Link to="perfil" className="block font-bold text-gray-700 hover:bg-gray-300 p-2 rounded">
                Perfil
              </Link>
            </li>
            <li className="mb-4">
              <Link to="endereco" className="block font-bold text-gray-700 hover:bg-gray-300 p-2 rounded">
                Endereço
              </Link>
            </li>
            <li className="mb-4">
              <Link to="seguranca" className="block font-bold text-gray-700 hover:bg-gray-300 p-2 rounded">
                Segurança
              </Link>
            </li>
            <li className="text-red-500">
              <button
                className="block w-full text-left font-bold hover:bg-red-100 p-2 rounded"
                onClick={() => openDeleteModal(1)} // Substitua "1" pelo ID real do usuário
              >
                Deletar conta
              </button>
            </li>
          </ul>
        </aside>
        <main className="w-3/4 p-6">
          <Outlet />
        </main>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Confirmar Exclusão</h3>
            <p className="mb-4">
              Tem certeza de que deseja deletar sua conta? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="bg-red-600 text-white font-semibold rounded px-4 py-2 mr-2"
              >
                Confirmar
              </button>
              <button
                type="button"
                onClick={closeDeleteModal}
                className="bg-gray-300 text-black font-semibold rounded px-4 py-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
