import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import HomePage from "@/pages/Home/HomePage";
import StorePage from "@/pages/Store/StorePage";
import LoginPage from "@/pages/Login/LoginPage";
import ProfilePage from "@/pages/Profile/ProfilePage";
import RegisterPage from "@/pages/Register/RegisterPage";
import GetCodePage from "@/pages/GetCode/GetCodePage";
import ValidadeCodePage from "@/pages/ValidadeCode/ValidateCodePage";
import ChangePasswordPage from "@/pages/ChangePassword/ChangePasswordPage";
import ProductPage from "@/pages/Product/ProductPage";
import ShoppingCart from "@/pages/ShoppingCart/ShoppingCart";
import Address from "@/pages/Profile/Address/Address";
import Profile from "@/pages/Profile/EditProfile/ProfileSection";
import Orders from "@/pages/Profile/Orders/Orders";
import Security from "@/pages/Profile/Security/Security";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "store", element: <StorePage /> },
      { path: "get-code", element: <GetCodePage /> },
      { path: "validate-code", element: <ValidadeCodePage /> },
      { path: "change-password", element: <ChangePasswordPage /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "shopping-cart", element: <ShoppingCart /> },
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          {
            path: "edit-profile",
            element: <Profile />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "edit-address",
            element: <Address />,
          },
          {
            path: "security",
            element: <Security />,
          },
        ],
      },
    ],
  },
]);
