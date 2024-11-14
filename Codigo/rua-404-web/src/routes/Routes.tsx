import { createBrowserRouter, Navigate } from "react-router-dom";
import { App } from "../App";
import * as Route from "../pages/index";
import { useAuth } from "../context/useAuth";
import {
  AdminDashboard,
  AdminRoutes,
  AdminStock,
  AdminOrders,
  AdminUsers
} from "@/pages/Admin/Dashboard/AdminRoutes";
import AdminLogin from "@/pages/Admin/Login/AdminLogin";

type RouteConfig = {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
  isPrivate?: boolean;
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

const publicRoutes: RouteConfig[] = [
  { path: "", element: <Route.HomePage /> },
  { path: "login", element: <Route.LoginPage /> },
  { path: "register", element: <Route.RegisterPage /> },
  { path: "store", element: <Route.StorePage /> },
  { path: "get-code", element: <Route.GetCodePage /> },
  { path: "validate-code", element: <Route.ValidadeCodePage /> },
  { path: "change-password", element: <Route.ChangePasswordPage /> },
  { path: "product/:id", element: <Route.ProductPage /> },
];

const profileRoutes: RouteConfig[] = [
  { path: "edit-profile", element: <Route.Profile />, isPrivate: true },
  { path: "orders", element: <Route.Orders />, isPrivate: true },
  { path: "edit-address", element: <Route.Address />, isPrivate: true },
  { path: "security", element: <Route.Security />, isPrivate: true },
];

const wrapPrivateRoute = (route: RouteConfig): RouteConfig => ({
  ...route,
  element: route.isPrivate ? (
    <PrivateRoute>{route.element}</PrivateRoute>
  ) : (
    route.element
  ),
  ...(route.children && {
    children: route.children.map(wrapPrivateRoute),
  }),
});

const routeConfig: RouteConfig[] = [
  {
    path: "/",
    element: <App />,
    children: [
      ...publicRoutes,
      {
        path: "shopping-cart",
        element: <Route.ShoppingCart />,
        isPrivate: true,
      },
      {
        path: "checkout",
        element: <Route.CheckoutPage />,
        isPrivate: true,
      },
      {
        path: "profile",
        element: <Route.ProfilePage />,
        isPrivate: true,
        children: profileRoutes,
      },
      { path: "*", element: <Route.NotFoundPage /> },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
    isPrivate: false,
  },
  {
    path: "/admin",
    element: <AdminRoutes />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "stock",
        element: <AdminStock />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "orders/not-sent",
        element: <AdminOrders />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "",
        element: <Navigate to="dashboard" replace />,
      },
    ],
  },
];

export const router = createBrowserRouter(routeConfig.map(wrapPrivateRoute));
