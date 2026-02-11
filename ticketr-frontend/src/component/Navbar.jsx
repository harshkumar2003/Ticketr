import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const isLoggedIn = Boolean(localStorage.getItem("role"));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    const onEsc = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    const onOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onEsc);
    document.addEventListener("mousedown", onOutside);
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.removeEventListener("mousedown", onOutside);
    };
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link to="/" onClick={() => setOpen(false)}>
            <img src={Logo} alt="Ticketr logo" className="w-35" />
          </Link>

          <ul className="hidden items-center gap-8 text-white md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Link
              to={isLoggedIn ? "/dashboard" : "/login"}
              className="rounded-lg border border-orange-500/40 bg-black/40 px-6 py-2 text-white transition-all duration-300 hover:border-orange-500"
            >
              {isLoggedIn ? "Dashboard" : "Login"}
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="text-orange-500 md:hidden"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 text-white backdrop-blur-lg">
          <div ref={panelRef} className="relative">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute -right-2 -top-12"
            >
              <X size={28} className="text-red-500" />
            </button>

            <ul className="flex flex-col gap-10 text-center text-base">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="relative after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to={isLoggedIn ? "/dashboard" : "/login"}
                  onClick={() => setOpen(false)}
                  className="inline-flex rounded-lg border border-orange-500/40 bg-black/40 px-6 py-2 text-white transition-all duration-300 hover:border-orange-500"
                >
                  {isLoggedIn ? "Dashboard" : "Login"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
