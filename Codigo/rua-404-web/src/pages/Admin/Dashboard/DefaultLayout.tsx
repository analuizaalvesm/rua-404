import React, { useState, ReactNode } from "react";
import Header from "../../../components/admin/components/Header/index";
import Sidebar from "../../../components/admin/components/Sidebar/index";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-[#F8F8F8] dark:bg-gray-800 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="max-w-screen p-10">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
