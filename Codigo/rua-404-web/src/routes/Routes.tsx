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
import ProfileSection from "@/pages/Profile/ProfileSection";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage />},
            { path: "register", element: <RegisterPage />},
            { path: "store", element: <StorePage />},
            { path: "get-code", element: <GetCodePage />},
            { path: "validate-code", element: <ValidadeCodePage />},
            { path: "change-password", element: <ChangePasswordPage />},
            { path: "product/:id", element: <ProductPage /> },
            {
                path: "profile",
                element: <ProfilePage />, // Página base de perfil
                children: [
                    { path: "perfil", element: <ProfileSection section="perfil" /> },
                    { path: "endereco", element: <ProfileSection section="endereco" /> },
                    { path: "seguranca", element: <ProfileSection section="seguranca" /> },
                ],
            },
        ],
    },
]);