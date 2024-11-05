import { useAuth } from "@/context/useAuth";
import {
  FiUser,
  FiMapPin,
  FiShoppingBag,
  FiLock,
  FiLayers,
  FiLogOut,
} from "react-icons/fi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const JobProfile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Visão Geral",
      path: "/profile/overall",
      icon: <FiLayers size={18} />,
    },
    {
      name: "Perfil",
      path: "/profile/edit-profile",
      icon: <FiUser size={18} />,
    },
    {
      name: "Endereço",
      path: "/profile/edit-address",
      icon: <FiMapPin size={18} />,
    },
    {
      name: "Pedidos",
      path: "/profile/orders",
      icon: <FiShoppingBag size={18} />,
    },
    {
      name: "Segurança",
      path: "/profile/edit-address",
      icon: <FiLock size={18} />,
    },
  ];

  return (
    <div className="max-w-full bg-[#fafafa]">
      <div className="mx-auto max-w-screen-2xl">
        <div className="pt-12 pb-4">
          <h2 className="text-2xl font-medium">Minha conta</h2>
          <p className="text-[#6A6A6A]">
            Gerencie as configurações da sua conta e defina as suas
            preferências.
          </p>
        </div>
        <div className="flex min-h-screen border-t border-gray-200">
          <aside className="w-2/12 bg-transparent border-r border-gray-200 pt-4 flex flex-col justify-between">
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <div className="relative w-full">
                      {location.pathname === item.path && (
                        <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-black" />
                      )}
                      <button
                        onClick={() => navigate(item.path)}
                        className={`w-full text-left bg-[#fafafa] text-[15px]/[15px] font-regular flex flex-row items-center py-3 px-4 gap-3 ${
                          location.pathname === item.path
                            ? "!bg-[#F5F5F5] !font-medium text-black"
                            : "text-gray-500 hover:bg-[#F5F5F5] hover:text-gray-800"
                        }`}
                      >
                        {item.icon}
                        {item.name}
                      </button>
                    </div>
                  </li>
                ))}
                <button
                  onClick={logout}
                  className="w-full mb-8 text-left bg-[#fafafa] text-[15px]/[15px] font-regular flex flex-row items-center py-3 px-4 gap-3 text-red-400 hover:bg-[#F5F5F5] hover:text-red-500"
                >
                  <FiLogOut size={18} />
                  Sair
                </button>
              </ul>
            </nav>
          </aside>
          <main className="w-10/12 pl-6 pt-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobProfile;
