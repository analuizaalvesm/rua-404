import Footer from "./components/custom/Footer/Footer";
import Navbar from "./components/custom/NavBar/NavBar";
import { UserProvider } from "./context/useAuth";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./context/useCart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <div className="font-regular">
      <UserProvider>
        <CartProvider>
          <Navbar />
          <Outlet />
          <Footer />
          <ToastContainer />
        </CartProvider>
      </UserProvider>
    </div>
  );
}
