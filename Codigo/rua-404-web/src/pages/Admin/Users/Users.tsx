import { useEffect, useState } from "react";
import { deleteUserProfile, getAllUsersProfile } from "../../../services/ProfileService";

type User = {
  customer_id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  create_data: string | null;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getAllUsersProfile();
    if (data) setUsers(data);
  };

  const handleDeleteUser = async () => {
    if (userToDelete !== null) {
      const success = await deleteUserProfile(userToDelete);
      if (success) {
        fetchUsers();
      }
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const openDeleteModal = (userId: number) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Data não disponível";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const UserCard = ({ user }: { user: User }) => (
    <div className="border rounded p-4 shadow-md flex flex-col">
      <h3 className="font-semibold mb-2">{user.first_name} {user.last_name}</h3>
      <p>Email: {user.email}</p>
      <p>Data de Criação: {formatDate(user.create_data)}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => openDeleteModal(user.customer_id)}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Excluir
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-full">
      <section className="bg-gray-50 dark:bg-gray-900 pb-10">
        <div className="mx-auto max-w-screen-2xl px-16">
          <h1 className="text-2xl font-bold mb-4">Gerenciar Usuários</h1>
          <main className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {users.length > 0 ? (
                users.map((user) => (
                  <UserCard key={user.customer_id} user={user} />
                ))
              ) : (
                <p className="col-span-full text-center">
                  Nenhum usuário encontrado.
                </p>
              )}
            </div>
          </main>
        </div>
      </section>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Confirmar Exclusão</h2>
            <p>Tem certeza de que deseja excluir este usuário?</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-black text-white rounded hover:bg-black hover:text-white transition mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700 transition"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
