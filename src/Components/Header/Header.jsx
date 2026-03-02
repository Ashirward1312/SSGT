// src/Components/Header/Header.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NavLink, Link, useLocation } from "react-router-dom";

import logo from "../Img/logo.png"; // <-- adjust if needed

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Route change -> close mobile menu
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Products", to: "/products" },
    { label: "Manufacturing", to: "/manufacturing" },
    { label: "Career", to: "/career" },
  ];

  const navClass = ({ isActive }) =>
    `relative font-medium transition group ${
      isActive ? "text-orange-400" : "text-neutral-300 hover:text-orange-400"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 m-0 p-0">
      {/* Background */}
      <motion.div
        animate={{
          backgroundColor: isScrolled
            ? "rgba(10,10,10,0.98)"
            : "rgba(10,10,10,0.85)",
          borderBottomColor: "rgba(249,115,22,0.2)",
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 border-b backdrop-blur-xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          {/* LEFT — LOGO */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <Link to="/" className="flex items-center gap-4 cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500 blur-xl opacity-30 rounded-2xl" />
                <img
                  src={logo}
                  alt="SSGT Group Logo"
                  className="relative h-16 w-16 object-contain rounded-2xl border-2 border-orange-500/40 shadow-xl bg-white p-1"
                />
              </div>

              <div className="hidden sm:block">
                <div className="text-white font-bold text-xl leading-tight">
                  SSGT GROUP
                </div>
                <div className="text-orange-400 text-sm tracking-widest">
                  Heat Defying Strength Enduring
                </div>
              </div>
            </Link>
          </motion.div>

          {/* CENTER — NAV */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
              </NavLink>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {/* Contact Button (React Router) */}
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 25px rgba(249,115,22,0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block"
            >
              <NavLink
                to="/contact"
                className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-xl shadow-lg transition-all duration-300"
              >
                <Phone size={18} />
                Contact
              </NavLink>
            </motion.div>

            {/* Mobile button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-neutral-950 border-b border-orange-500/20"
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-lg ${isActive ? "text-orange-400" : "text-neutral-300 hover:text-orange-400"}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/contact"
              className="mt-2 bg-orange-500 text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Contact
            </NavLink>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;