import { Outlet } from "react-router-dom";
import { AdminProvider } from "./context/useAdminAuth";

export function AdminLayout() {
  return (
    <div className="font-regular">
      <AdminProvider>
        <Outlet />
      </AdminProvider>
    </div>
  );
}
