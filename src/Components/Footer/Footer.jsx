// src/Components/Footer/Footer.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  MessageCircle,
  ArrowUpRight,
  ChevronUp, // ✅ scroll-to-top icon
} from "lucide-react";
import logo from "../Img/logo.png";

const Footer = () => {
  const EMAIL = "info@ssgtgroup.com";
  const PHONES = ["+91 8435317776", "+91 8349177761"];
  const WHATSAPP_NUMBERS = ["918435317776", "918349177761"];
  const whatsappText =
    "Hello SSGT Group, I would like to enquire about silica ramming mass for induction furnace applications.";

  const SOCIAL = {
    linkedin: "https://www.linkedin.com/company/ssgt-group/",
    instagram:
      "https://www.instagram.com/ssgtgroup?igsh=MWozZ3lhbWJrbHV5ag==",
  };

  const waLink = (num) =>
    `https://wa.me/${num}?text=${encodeURIComponent(whatsappText)}`;

  const year = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Mission & Vision", to: "/mission" },
    { label: "Core Values", to: "/core-values" },
    { label: "Contact", to: "/contact" },
  ];

  // ✅ Scroll-to-top button show/hide
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-neutral-950 text-neutral-300">
      {/* ✅ Scroll To Top Floating Button (inside footer file) */}
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-[9999] grid h-11 w-11 place-items-center rounded-full
               bg-orange-500 text-white shadow-lg transition
               hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400/60"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      {/* Top line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-16 lg:py-12">
        {/* ── Main Grid ── */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1 — Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="SSGT Group"
                className="h-11 w-11 rounded-lg bg-white p-1 object-contain"
              />
              <div>
                <div className="text-lg font-extrabold text-white">
                  SSGT GROUP
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-orange-400">
                  Heat Defying Strength Enduring
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-neutral-500">
              Specialized manufacturer of silica ramming mass for induction
              furnace applications in steel & foundry sectors.
            </p>

            {/* Social */}
            <div className="mt-4 flex gap-2">
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 transition hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-neutral-400 transition hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400"
              >
                <Instagram className="h-4 w-4" />
              </a>

              {WHATSAPP_NUMBERS.map((n) => (
                <a
                  key={n}
                  href={waLink(n)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition hover:bg-emerald-500/20"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* 2 — Quick Links */}
          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-white">
              Quick Links
            </div>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-neutral-400 transition hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3 — Contact */}
          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-white">
              Contact
            </div>
            <div className="mt-3 space-y-2">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-orange-400"
              >
                <Mail className="h-4 w-4 text-orange-500/70" />
                {EMAIL}
              </a>

              {PHONES.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-neutral-400 transition hover:text-orange-400"
                >
                  <Phone className="h-4 w-4 text-orange-500/70" />
                  {p}
                </a>
              ))}
            </div>
          </div>

          {/* 4 — Address */}
          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-white">
              Address
            </div>
            <div className="mt-3 space-y-3 text-sm text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500/70" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                    Manufacturing
                  </div>
                  <div className="mt-0.5">Dharsiwa, Raipur, Chhattisgarh</div>
                  <div>Gerwani, Raigarh, Chhattisgarh</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500/70" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                    Corporate Office
                  </div>
                  <div className="mt-0.5">Raipur, Chhattisgarh</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-8 h-px w-full bg-white/[0.06]" />

        {/* ── Bottom Bar ── */}
        <div className="mt-5 flex flex-col items-center gap-3 text-center">
          <div className="text-xs text-neutral-600">
            © {year} SSGT Group. All rights reserved.
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-500/40" />
            <span className="text-xs font-medium tracking-wide text-neutral-500">
              Designed & Developed by{" "}
              <a
                href="https://spadvertising.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-bold text-orange-400 transition hover:text-orange-300"
              >
                SP Advertising
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-orange-500/40" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;