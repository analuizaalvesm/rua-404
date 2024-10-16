import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import HomePage from "@/pages/Home/HomePage";
import StorePage from "@/pages/Store/StorePage";
import LoginPage from "@/pages/Login/LoginPage";
import RegisterPage from "@/pages/Register/RegisterPage";
import RecoverPasswordPage from "@/pages/RecoverPassword/GetCode/GetCodePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage />},
            { path: "register", element: <RegisterPage />},
            { path: "store", element: <StorePage />},
            { path: "recover-password", element: <RecoverPasswordPage />}
        ]
    }
]);