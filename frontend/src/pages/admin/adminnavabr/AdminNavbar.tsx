import { useState } from "react";
import { LayoutDashboard, Package, PlusCircle, List, Users, Settings, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "@/hooks/ThemeToggle";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  {
    name: "Products",
    icon: Package,
    submenu: [
      { name: "Add Car", icon: PlusCircle, path: "/admin/add-car" },
      { name: "Update Car", icon: List, path: "/admin/update-car" },
    ],
  },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
];

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen w-64 z-40 bg-white dark:bg-gray-900 border-r shadow-sm transition-transform duration-300 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="px-6 py-4 text-xl font-bold border-b dark:border-gray-700 flex justify-between">
         <div> Admin Panel</div>
         <ThemeToggle/>

        </div>

        <nav className="flex flex-col p-4 gap-2">
          {navItems.map(({ name, icon: Icon, path, submenu }) => (
            <div key={name}>
              {submenu ? (
                <>
                  {/* Parent menu item */}
                  <button
                    onClick={() => toggleMenu(name)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-expanded={!!openMenus[name]}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span>{name}</span>
                    </div>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openMenus[name] ? "rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>

                  {/* Submenu */}
                  <div
                    className={`pl-8 mt-1 flex flex-col gap-1 overflow-hidden transition-max-height duration-300 ease-in-out ${
                      openMenus[name] ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    {submenu.map(({ name: subName, icon: SubIcon, path: subPath }) => (
                      <NavLink
                        key={subName}
                        to={subPath}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
                          ${
                            isActive
                              ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                              : "text-gray-600 dark:text-gray-300"
                          } hover:bg-gray-100 dark:hover:bg-gray-800`
                        }
                        onClick={() => setIsOpen(false)} // close on mobile
                      >
                        <SubIcon className="h-4 w-4" />
                        {subName}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink
                  to={path!}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                    ${
                      isActive
                        ? "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                        : "text-gray-600 dark:text-gray-300"
                    } hover:bg-gray-100 dark:hover:bg-gray-800`
                  }
                  onClick={() => setIsOpen(false)} // close sidebar on mobile nav
                >
                  <Icon className="h-5 w-5" />
                  {name}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
