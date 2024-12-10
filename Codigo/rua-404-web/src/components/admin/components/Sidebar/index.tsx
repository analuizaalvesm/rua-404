import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiLayers } from "react-icons/fi";
import { BsGrid } from "react-icons/bs";
import { LucidePencilRuler, ShoppingBag, Users } from "lucide-react";
import { RiFolderDownloadFill } from "react-icons/ri";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col bg-gray-900 overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 px-8 py-6 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-4 py-5.5 lg:py-6.5">
        <NavLink to="/admin/dashboard" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100">
            <span className="text-black font-bold text-xl">R</span>
          </div>
          <h1 className="font-regular text-2xl text-white">
            Rua<span className="font-semibold">Admin</span>
          </h1>
        </NavLink>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 lg:mt-9">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-500">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5 text-gray-300">
              <li>
                <NavLink
                  to="/admin/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-regular text-bodydark1 duration-300 ease-in-out hover:bg-gray-800 dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/dashboard") &&
                    "bg-gray-800 dark:bg-meta-4"
                  }`}
                >
                  <BsGrid size={20} />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/stock"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-regular text-bodydark1 duration-300 ease-in-out hover:bg-gray-800 dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/stock") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FiLayers size={20} />
                  Estoque
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/admin/orders"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-regular text-bodydark1 duration-300 ease-in-out hover:bg-gray-800 dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/orders") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <ShoppingBag size={20} />
                  Pedidos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/CMS"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-regular text-bodydark1 duration-300 ease-in-out hover:bg-gray-800 dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/users") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <LucidePencilRuler size={20} />
                  CMS
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/report"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-regular text-bodydark1 duration-300 ease-in-out hover:bg-gray-800 dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/report") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <RiFolderDownloadFill size={20} />
                  Relatórios
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-500">
              OUTROS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5 text-gray-300">
              <li>
                <NavLink
                  to="/admin/users"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-regular text-bodydark1 duration-300 ease-in-out hover:bg-gray-800 dark:hover:bg-meta-4 ${
                    pathname.includes("/admin/users") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <Users size={20} />
                  Usuários
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <footer className="mt-auto mb-4 lg:mb-2">
        <div className="flex flex-col items-center gap-1 px-4 font-light text-sm text-gray-500">
          <span>© 2024 Rua 4.0.4</span>
          <span>Versão 1.0</span>
        </div>
      </footer>
    </aside>
  );
};

export default Sidebar;
