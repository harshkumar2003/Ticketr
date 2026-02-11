import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext.jsx";
import { LogOut, User } from "lucide-react";
import { logout } from "../api/auth.js";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function TopNavbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const firstChar = user?.email?.charAt(0)?.toUpperCase() || "U";

  const handleGoToSettings = (tab) => {
    setOpen(false);
    navigate(`/settings?tab=${tab}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("role");
      setUser(false);
      toast.success("Logged out");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="w-full h-16 flex items-center justify-between px-6 bg-[#0B0B0B] border-b border-white/10 backdrop-blur-xl z-50">
      <Link to="/dashboard" className="block">
        <img src={Logo} alt="Ticketr logo" className="w-35" />
      </Link>
      <div className="flex items-center gap-4 relative">
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-linear-to-br from-orange-400 to-orange-600  flex items-center justify-center text-black font-semibold"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-haspopup="menu"
            aria-label="Open account menu"
          >
            {firstChar}
          </button>
          {open && (
            <div className="absolute right-0 mt-3 w-52 rounded-2xl bg-[#0F0F0F] border border-white/10 shadow-2xl overflow-hidden z-50">
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-sm text-gray-200"
                onClick={() => handleGoToSettings("profile")}
              >
                <User /> Profile
              </button>
              <button
                type="button"
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
