import { Outlet } from "react-router-dom";
import AdminSidebar from "../adminnavabr/AdminNavbar";


const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 p-6 bg-gray-50 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
