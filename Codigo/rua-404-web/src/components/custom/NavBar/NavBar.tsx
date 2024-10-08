import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useAuth } from "../../../context/useAuth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu/dropdown-menu";

interface Props {}

const Navbar = (props: Props) => {
  const { isAuthenticated, user, logout } = useAuth();
  const currentRoute = window.location.pathname;

  return (
    <nav className="relative container mx-auto p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="" height="200" width="200" />
          </Link>
          <div className="hidden font-bold lg:flex space-x-6">
            <Link to="/" className="text-black hover:text-slate-600">
              Home
            </Link>
            <Link to="/store" className="text-black hover:text-slate-600">
              Store
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
                    Welcome, {user?.username}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logout}
                    className="block px-4 py-2 text-red-500 hover:bg-slate-100"
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

        {isAuthenticated() ? (
          <div className="hidden lg:flex items-center space-x-6 text-black">
            <div className="hover:text-darkBlue">Welcome, {user?.username}</div>
            <a
              onClick={logout}
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
            >
              Sair
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-black">
            {currentRoute === "/login" ? (
              <Link to="/register" className="text-black hover:text-slate-600">
                Registrar
              </Link>
            ) : (
              <Link to="/login" className="text-black hover:text-slate-600">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
