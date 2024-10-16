import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import HomePage from "@/pages/Home/HomePage";
import StorePage from "@/pages/Store/StorePage";
import LoginPage from "@/pages/Login/LoginPage";
import RegisterPage from "@/pages/Register/RegisterPage";
import GetCodePage from "@/pages/RecoverPassword/GetCode/GetCodePage";
import ValidadeCodePage from "@/pages/RecoverPassword/ValidadeCode/ValidateCodePage";
import ChangePasswordPage from "@/pages/RecoverPassword/ChangePassword/ChangePasswordPage";
import ProductPage from "@/pages/Product/ProductPage";

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
            { path: "product/:id", element: <ProductPage /> }
        ]
    }
]);