import { Link, Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Minha conta</h1>
      <p className="text-gray-600 mb-8">Gerencie as configurações da sua conta e defina as suas preferências.</p>

      <div className="flex">
        {/* Menu lateral */}
        <aside className="w-1/4">
          <ul>
            <li className="mb-2">
              <Link to="perfil" className="font-bold">
                Perfil
              </Link>
            </li>
            <li className="mb-2">
              <Link to="endereco" className="font-bold">
                Endereço
              </Link>
            </li>
            <li className="mb-2">
              <Link to="seguranca" className="font-bold">
                Segurança
              </Link>
            </li>
            <li className="text-red-500">
              <button>Deletar conta</button>
            </li>
          </ul>
        </aside>
        <main className="w-3/4 ml-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
