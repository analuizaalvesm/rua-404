import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Logo from "../../../../assets/general/logo/logo.svg";
import {
  FiDownloadCloud,
  FiFile,
  FiGrid,
  FiLayers,
  FiSettings,
} from "react-icons/fi";
import { BsGrid, BsShop } from "react-icons/bs";
import { ShoppingBag, Users } from "lucide-react";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { BiColor } from "react-icons/bi";

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
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
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

  // close if the esc key is pressed
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
        <NavLink to="/" className="flex items-center gap-3">
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
                  to="#"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-regular text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    (pathname === "/" || pathname.includes("dashboard")) &&
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
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-regular text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("admin/stock") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <ShoppingBag size={20} />
                  Estoque
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/reports"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-regular text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("admin/stock") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FiFile size={20} />
                  Relatórios
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/cms"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-regular text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("admin/stock") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <BiColor size={20} />
                  CMS
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-regular text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("settings") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FiSettings size={20} />
                  Configurações
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
                  to="/chart"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-regular text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("chart") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <Users size={20} />
                  Usuários
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-regular text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    (pathname === "/ui" || pathname.includes("ui")) &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FiLayers size={20} />
                  Produtos
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
