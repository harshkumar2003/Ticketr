import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext.jsx";
import { LogOut, Settings, User } from "lucide-react";
import { logout } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

function TopNavbar() {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const firstChar = user.email.charAt(0).toUpperCase();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      window.location.reload(); // optional, ensures clean state
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <div className=" w-full h-16 flex items-center justify-between px-6 bg-white dark:bg-[#0B0B0B] border-b border-gray-200 dark:border-white/10 backdrop-blur-xl z-50">
      <div className="">
        <img src={Logo} alt="logo" className="w-35" />
      </div>
      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <button
            className="w-9 h-9 rounded-full bg-linear-to-br from-orange-400 to-orange-600  flex items-center justify-center text-black font-semibold"
            onClick={() => setOpen((prev) => !prev)}
          >
            {firstChar}
          </button>
          {open && (
            <div className="absolute right-0 mt-3 w-52 rounded-2xl bg-white dark:bg-[#0F0F0F] border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden z-50">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 text-sm dark:text-gray-200"
                onClick={() => setOpen(false)}
              >
                <User /> Profile
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 text-sm dark:text-gray-200"
                onClick={() => setOpen(false)}
              >
                <Settings /> Settings
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 text-sm text-red-500"
                onClick={handleLogout}
              >
                <LogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default TopNavbar;
