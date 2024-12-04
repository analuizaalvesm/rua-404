import PageTitle from "@/components/admin/components/PageTitle";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import Loader from "@/components/admin/components/Loader";
import Stock from "../Stock/Stock";
import Users from "../Users/Users";
import Dashboard from "./Dashboard";
import Orders from "../Orders/Orders";
import CMSPage from "../CMS/CMSPage";
import Report from "../Report/Report";

const AdminRoutes = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="font-regular">
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </div>
  );
};

export { AdminRoutes };

const AdminDashboard = () => {
  return (
    <>
      <PageTitle title="RuaAdmin - Dashboard" />
      <Dashboard />
    </>
  );
};

export { AdminDashboard };

const AdminStock = () => {
  return (
    <>
      <PageTitle title="RuaAdmin - Estoque" />
      <Stock />
    </>
  );
};

export { AdminStock };

const AdminOrders = () => {
  return (
    <>
      <PageTitle title="RuaAdmin - Pedidos" />
      <Orders />
    </>
  );
};

export { AdminOrders };

const AdminUsers = () => {
  return (
    <>
      <PageTitle title="RuaAdmin - Usuários" />
      <Users />
    </>
  );
};

export { AdminUsers };

const AdminCMS = () => {
  return (
    <>
      <PageTitle title="RuaAdmin - CMS" />
      <CMSPage />
    </>
  );
};

export { AdminCMS };

const AdminReport = () => {
  return (
    <>
      <PageTitle title="RuaAdmin - Relatórios" />
      <Report />
    </>
  );
};

export { AdminReport };
