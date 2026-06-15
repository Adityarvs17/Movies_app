import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import SideBar from "../../components/admin/SideBar";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <AdminNavbar />
      <div className="flex flex-1">
        <SideBar className="w-64" />
        <div className="flex-1 px-4 py-6 md:px-10 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
