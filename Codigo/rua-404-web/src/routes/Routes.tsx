import { createBrowserRouter, Navigate } from "react-router-dom";
import { App } from "../App";
import * as Route from "../pages/index";
import { useAuth, UserProvider } from "../context/useAuth";
import {
  AdminDashboard,
  AdminRoutes,
  AdminStock,
  AdminOrders,
  AdminUsers,
  AdminCMS,
  AdminReport,
} from "@/pages/Admin/Dashboard/AdminRoutes";
import AdminRoute from "./AdminRoute";

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
  { path: "gallery", element: <Route.Gallery /> },
  { path: "about-us", element: <Route.AboutUs /> },
  { path: "get-code", element: <Route.GetCodePage /> },
  { path: "validate-code", element: <Route.ValidadeCodePage /> },
  { path: "change-password", element: <Route.ChangePasswordPage /> },
  { path: "product/:id", element: <Route.ProductPage /> },
];

const profileRoutes: RouteConfig[] = [
  { path: "orders", element: <Route.Orders />, isPrivate: true },
  { path: "order/:id", element: <Route.OrderDetails />, isPrivate: true },
  { path: "edit-profile", element: <Route.Profile />, isPrivate: true },
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
    path: "/admin",
    element: (
      <UserProvider>
        <AdminRoute requiredRole="ADMIN">
          <AdminRoutes />
        </AdminRoute>
      </UserProvider>
    ),
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
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "cms",
        element: <AdminCMS />,
      },
      {
        path: "report",
        element: <AdminReport />,
      },
      {
        path: "",
        element: <Navigate to="dashboard" replace />,
      },
    ],
  },
];

export const router = createBrowserRouter(routeConfig.map(wrapPrivateRoute));
