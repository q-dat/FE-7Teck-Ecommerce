import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../../components/admin/NavbarAdmin';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
const Admin: React.FC<{}> = () => {
  // Title Tag
  useEffect(() => {
    document.title = `Trang Quản Trị`;
  });
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F3F2F7] dark:bg-gray-900">
      <div className="flex flex-1">
        <div className="z-10 hidden xl:block">
          <SidebarAdmin />
        </div>
        <div className="flex-1 xl:p-6">
          <div className="xl:ml-64">
            <div>
              <NavbarAdmin />
            </div>
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
