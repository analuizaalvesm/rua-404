import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useAuth } from "../../../context/useAuth";

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
          <div className="hidden font-bold lg:flex">
            <Link to="/" className="text-black hover:text-slate-600">
              Home
            </Link>
          </div>
          <div className="hidden font-bold lg:flex">
            <Link to="/store" className="text-black hover:text-slate-600">
              Store
            </Link>
          </div>
        </div>
        {isAuthenticated() ? (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <div className="hover:text-darkBlue">Welcome, {user?.username}</div>
            <a
              onClick={logout}
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
            >
              Sair
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            {currentRoute === "/login" ? (
            <Link to="/register" className="text-black hover:text-slate-600">
              Registrar
            </Link>
            ) : (
            <Link
              to="/login"
              className="text-black hover:text-slate-600"
            >
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
