import { createElement } from "react";
import { NavLink } from "react-router-dom";
import {
  CheckCircle,
  Home,
  Lock,
  PlusCircle,
  Settings,
  Ticket,
  User,
  Users,
  UserCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

function Sidebar() {
  const { user } = useAuth();
  const role = user?.role || localStorage.getItem("role");

  const commonItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
  ];
  const userItems = [
    { to: "/create-ticket", icon: PlusCircle, label: "Create" },
    { to: "/my-tickets", icon: User, label: "My Tickets" },
    { to: "/resolve-ticket", icon: CheckCircle, label: "Resolve" },
  ];
  const adminItems = [
    { to: "/admin/tickets", icon: Ticket, label: "All Tickets" },
    { to: "/admin/users", icon: Users, label: "All Users" },
    { to: "/admin/assign", icon: UserCheck, label: "Assign" },
    { to: "/admin/close", icon: Lock, label: "Close" },
  ];

  const navItems = [
    ...commonItems,
    ...(role === "ADMIN" ? adminItems : []),
    ...(role === "USER" ? userItems : []),
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside
      className="h-full self-stretch bg-[#0B0B0F] border-r border-white/5 flex flex-col shadow-2xl z-40 w-16 md:w-64 transition-all duration-300"
      aria-label="Sidebar navigation"
    >
      <nav className="flex flex-col gap-1 px-2 md:px-3 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={item.label}
            aria-label={item.label}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 h-11 rounded-xl px-3 transition-all duration-300 ${
                isActive
                  ? "bg-orange-500/15 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {createElement(item.icon, {
              size: 20,
              className: "text-orange-500 shrink-0",
            })}
            <span className="hidden md:block text-sm font-medium">
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
