import Footer from "./components/custom/Footer/Footer";
import Navbar from "./components/custom/NavBar/NavBar";
import { UserProvider } from "./context/useAuth";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./context/useCart";
import { AdminProvider } from "./context/useAdminAuth";

export function App() {
  return (
    <div className="font-regular">
      <UserProvider>
        <CartProvider>
          <Navbar />
          <Outlet />
          <Footer />
        </CartProvider>
      </UserProvider>
    </div>
  );
}
