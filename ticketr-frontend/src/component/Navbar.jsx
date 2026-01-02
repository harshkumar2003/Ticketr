import { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
// import {logout} from "../api/auth.js";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";

function Navbar() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const role = localStorage.getItem("role");



    const navItems = [
        { label: "Home", path: "/" },
        { label: "Features", path: "/features" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
    ];

    // Lock background scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    return (
        <>
            <nav className="sticky top-0 z-40 w-full bg-black/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

                    {/* LOGO */}
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="w-35" />
                    </Link>

                    {/* DESKTOP NAV */}
                    <ul className="hidden md:flex items-center gap-8 text-white">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-orange-500 hover:after:w-full after:transition-all after:duration-300">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* DESKTOP CTA */}
                    <div className="hidden md:block">
                        <Link
                            to="/login"
                            className="px-6 py-2 rounded-lg border border-orange-500/40 bg-black/40 hover:border-orange-500 transition-all duration-300 text-white"
                        >
                            Login
                        </Link>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        onClick={() => setOpen(true)}
                        className="md:hidden text-orange-500"
                    >
                        <Menu size={28} />
                    </button>
                </div>

                {/* BOTTOM GLOW LINE */}
                <div className="h-0.5 w-full bg-linear-to-r from-transparent via-orange-400/80 to-transparent shadow-[0_0_20px_rgba(255,140,60,0.6)]" />
            </nav>


            {open && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center text-white">

                    {/* CLOSE BUTTON */}
                    <button
                        aria-label="Close menu"
                        onClick={() => setOpen(false)}
                        className="absolute top-4 right-4"
                    >
                        <X size={28} className="text-red-500" />
                    </button>

                    {/* MENU ITEMS */}
                    <ul className="flex flex-col gap-10 text-m text-center">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    onClick={() => setOpen(false)}
                                    className="relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-0 after:bg-orange-500 hover:after:w-full after:transition-all after:duration-300"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default Navbar;
