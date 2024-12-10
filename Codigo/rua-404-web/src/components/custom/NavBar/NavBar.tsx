import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu/dropdown-menu";
import logo from "../../../assets/images/logo_rua.png";
import logoWhite from "../../../assets/images/logo_rua_white.png";
import { useState } from "react";
import { FiUser, FiHeart, FiArrowRight } from "react-icons/fi";
import { useCart } from "@/context/useCart";
import CartDropdown from "./components/CartDropdown";
import UserOne from "@/assets/images/blue_dog.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, role } = useAuth();
  const { cartCount, cartItems } = useCart();

  const [isHovering, setIsHovering] = useState(false);
  const currentRoute = window.location.pathname;

  const location = useLocation();

  const allowedRoutes = ["/", "/gallery", "/about-us"];

  return (
    <>
      <div
        className={`${
          allowedRoutes.includes(currentRoute)
            ? "bg-black hover:bg-white text-white hover:text-black"
            : "bg-white text-black"
        } tracking-wider transition-colors duration-300 group`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <nav className="relative container mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-20">
              <div className="hidden font-bold lg:flex space-x-6">
                <Link
                  to="/"
                  className="font-orbitron-medium border-b-2 border-transparent hover:border-b-2 hover:border-black"
                >
                  HOME
                </Link>
                <Link
                  to="/store"
                  className="font-orbitron-medium border-b-2 border-transparent hover:border-b-2 hover:border-black"
                >
                  STORE
                </Link>
                <Link
                  to="/gallery"
                  className="font-orbitron-medium border-b-2 border-transparent hover:border-b-2 hover:border-black"
                >
                  GALLERY
                </Link>
                <Link
                  to="/about-us"
                  className="font-orbitron-medium border-b-2 border-transparent hover:border-b-2 hover:border-black"
                >
                  ABOUT US
                </Link>
              </div>
            </div>

            <div className="lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-transparent text-black">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white shadow-lg rounded-lg mt-2 w-48"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-black hover:bg-slate-100"
                    >
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/store"
                      className="block px-4 py-2 text-black hover:bg-slate-100"
                    >
                      Store
                    </Link>
                  </DropdownMenuItem>
                  {isAuthenticated() ? (
                    <>
                      <DropdownMenuItem className="block px-4 py-2 text-black">
                        Welcome, {user?.email}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={logout}
                        className="block px-4 py-2 text-black hover:bg-slate-100"
                      >
                        Sair
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      {currentRoute === "/login" ? (
                        <DropdownMenuItem asChild>
                          <Link
                            to="/register"
                            className="block px-4 py-2 text-black hover:bg-slate-100"
                          >
                            Registrar
                          </Link>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem asChild>
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-black hover:bg-slate-100"
                          >
                            Login
                          </Link>
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <img
                src={
                  isHovering
                    ? logo
                    : !allowedRoutes.includes(currentRoute)
                    ? logo
                    : logoWhite
                }
                alt="RUA 404"
                className="w-56"
              />
            </div>

            {isAuthenticated() && role !== "ADMIN" ? (
              <div className="hidden lg:flex items-center text-black">
                <div
                  className={`flex items-center space-x-4 ${
                    allowedRoutes.includes(currentRoute)
                      ? "text-white group-hover:text-black"
                      : "text-black"
                  }`}
                >
                  <div className="flex items-center relative">
                    <FiHeart size={20} />
                    <span className="pl-2">0</span>
                  </div>
                  <CartDropdown cartItems={cartItems} cartCount={cartCount} />
                  <Link to="/profile/edit-profile">
                    <FiUser size={20} />
                  </Link>
                </div>
              </div>
            ) : isAuthenticated() && role === "ADMIN" ? (
              <div
                className="flex flex-row items-center gap-4 cursor-pointer"
                onClick={() => navigate("/admin/dashboard")}
              >
                <span className="hidden text-right lg:block">
                  <span
                    className={`block text-sm font-medium text-black dark:text-white ${
                      allowedRoutes.includes(currentRoute)
                        ? "text-white group-hover:text-black"
                        : "text-black"
                    }`}
                  >
                    {user?.email}
                  </span>
                  <span
                    className={`block text-xs text-gray-500 ${
                      allowedRoutes.includes(currentRoute)
                        ? "text-white group-hover:text-black"
                        : "text-black"
                    }`}
                  >
                    Administrador
                  </span>
                </span>

                <span className="h-12 w-12">
                  <img src={UserOne} alt="User" className="rounded-full" />
                </span>
                <FiArrowRight size={20} color={"#000"} />
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-4 text-black">
                <Link
                  to="/login"
                  className={`text-white border-2 border-black font-medium text-sm py-2 px-2 focus:outline-none ${
                    allowedRoutes.includes(currentRoute)
                      ? "group-hover:bg-white group-hover:text-black group-hover:border-2 group-hover:border-black transition-colors duration-300"
                      : "bg-white border-black !text-black"
                  }`}
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  className={`text-white font-semibold text-sm border-2 border-white py-2 px-2 ${
                    allowedRoutes.includes(currentRoute)
                      ? "group-hover:bg-black group-hover:border-2 group-hover:border-black group-hover:text-white transition-colors duration-300"
                      : "bg-black !border-black !text-white"
                  }`}
                >
                  REGISTER
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {location.pathname === "/store" && (
        <div className="bg-[#37CA7F] text-white text-center p-2 w-full">
          15% OFF NA PRIMEIRA COMPRA
        </div>
      )}
    </>
  );
};

export default Navbar;
