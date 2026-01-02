import { NavLink } from "react-router-dom";
import {
  Home,
  PlusCircle,
  User,
  Ticket,
  UserCheck,
  CheckCircle,
  Lock,
  Settings,
} from "lucide-react";
function Sidebar() {
  const navItems = [
    { to: "/dashboard", icon: Home, label: "Home" },
    { to: "/create-ticket", icon: PlusCircle, label: "Create" },
    { to: "/my-tickets", icon: User, label: "My Tickets" },
    { to: "/admin/tickets", icon: Ticket, label: "All Tickets" },
    { to: "/admin/assign", icon: UserCheck, label: "Assign" },
    { to: "/resolve-ticket", icon: CheckCircle, label: "Resolve" },
    { to: "/admin/close", icon: Lock, label: "Close" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div
      className="h-screen bg-[#0B0B0F] border-r border-white/5
        flex flex-col shadow-2xl z-50
        w-16 md:w-64 transition-all duration-300"
    >
      <nav className="flex flex-col gap-1 px-2 md:px-3 mt-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group relative flex items-center gap-3
               h-11 rounded-xl px-3
               transition-all duration-300
               ${
                 isActive
                   ? "bg-orange-500/15 text-white"
                   : "text-gray-400 hover:bg-white/5 hover:text-white"
               }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 w-1 h-full bg-orange-500 rounded-r-xl" />
                )}

                <Icon size={20} className="text-orange-500 shrink-0" />

                {/* LABEL – DESKTOP ONLY */}
                <span className="hidden md:block text-sm font-medium">
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
