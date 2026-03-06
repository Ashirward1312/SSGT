// src/Components/Header/Header.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, LayoutGrid } from "lucide-react"; // ✅ Menu icon replaced
import { NavLink, Link, useLocation } from "react-router-dom";

import logo from "../Img/logo.png"; // <-- adjust if needed

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Route change -> close mobile menu
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // ✅ lock body scroll when menu open (mobile friendly)
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ✅ close on ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

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
    <header className="fixed top-0 left-0 w-full z-50 m-0 p-0 relative">
      {/* Background (✅ click block fix) */}
      <motion.div
        animate={{
          backgroundColor: isScrolled
            ? "rgba(10,10,10,0.98)"
            : "rgba(10,10,10,0.85)",
          borderBottomColor: "rgba(249,115,22,0.2)",
        }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 border-b backdrop-blur-xl z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
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
          <div className="flex items-center gap-3">
            {/* Contact Button (Desktop) */}
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

            {/* ✅ Mobile toggle button (Menu replaced with LayoutGrid) */}
            <button
              type="button"
              onClick={() => setIsOpen((p) => !p)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/5 text-white"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <LayoutGrid size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ MOBILE MENU (Overlay + Drawer => better responsive) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay (tap outside to close) */}
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/55 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.aside
              className="lg:hidden fixed top-0 right-0 h-dvh w-[82%] max-w-sm bg-neutral-950 border-l border-orange-500/20 z-50"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.22 }}
            >
              <div className="h-24 px-6 flex items-center justify-between border-b border-orange-500/15">
                <div className="text-white font-bold">Menu</div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-white inline-flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="px-6 py-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `text-lg font-medium ${
                        isActive
                          ? "text-orange-400"
                          : "text-neutral-300 hover:text-orange-400"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                <NavLink
                  to="/contact"
                  className="mt-3 bg-orange-500 text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  Contact
                </NavLink>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;