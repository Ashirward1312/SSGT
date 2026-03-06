import React, { useState, useMemo } from "react";

/* ========= YOUR FOOTER DATA (same) ========= */
const WHATSAPP_NUMBERS = ["918435317776", "918349177761"];

const WHATSAPP_TEXT =
  "Hello SSGT Group, I would like to enquire about silica ramming mass for induction furnace applications.";

const SOCIAL = {
  linkedin: "https://www.linkedin.com/company/ssgt-group/",
  instagram: "https://www.instagram.com/ssgtgroup?igsh=MWozZ3lhbWJrbHV5ag==",
};

/* ✅ WhatsApp link helper (most compatible on mobile) */
const waLink = (num) =>
  `https://api.whatsapp.com/send?phone=${num}&text=${encodeURIComponent(
    WHATSAPP_TEXT
  )}`;

/* ---------- Inline SVG Icons (no extra package needed) ---------- */
const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.45 0 .1 5.35.1 11.94c0 2.1.55 4.15 1.6 5.97L0 24l6.25-1.64a11.9 11.9 0 0 0 5.8 1.48h.01c6.59 0 11.94-5.35 11.94-11.94 0-3.19-1.24-6.2-3.48-8.42ZM12.05 21.8h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.22-3.71.98.99-3.62-.24-.37a9.88 9.88 0 0 1-1.52-5.25C2.15 6.45 6.55 2.05 12.05 2.05c2.63 0 5.1 1.02 6.95 2.87a9.77 9.77 0 0 1 2.88 6.95c0 5.5-4.4 9.93-9.83 9.93Zm5.74-7.84c-.31-.16-1.85-.91-2.14-1.02-.29-.11-.5-.16-.71.16-.21.31-.82 1.02-1 1.23-.18.21-.37.23-.68.08-.31-.16-1.31-.48-2.49-1.54-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.13-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.98-2.34-.26-.63-.53-.54-.71-.55h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61 0 1.54 1.13 3.02 1.28 3.23.16.21 2.23 3.41 5.4 4.78.75.33 1.34.52 1.8.67.76.24 1.45.21 2 .13.61-.09 1.85-.76 2.11-1.5.26-.73.26-1.36.18-1.5-.08-.13-.29-.21-.6-.37Z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.8-2.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.26-.02-2.88-1.75-2.88-1.76 0-2.03 1.37-2.03 2.78V21h-4V9Z" />
  </svg>
);

/* ---------- Button UI ---------- */
const FloatingBtn = ({ href, onClick, label, bgClass, children }) => {
  const common =
    "group relative w-12 h-12 rounded-full shadow-lg grid place-items-center text-white " +
    "transition-transform duration-200 hover:scale-110 active:scale-95 ring-1 ring-black/10";

  // Tooltip should open to the RIGHT when icons are on LEFT
  const tooltip =
    "pointer-events-none absolute left-14 top-1/2 hidden -translate-y-1/2 whitespace-nowrap " +
    "rounded-lg bg-black/80 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur " +
    "transition group-hover:opacity-100 sm:block";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        title={label}
        className={`${common} ${bgClass}`}
      >
        {children}
        <span className={tooltip}>{label}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`${common} ${bgClass}`}
    >
      {children}
      <span className={tooltip}>{label}</span>
    </button>
  );
};

const FloatingSocials = () => {
  const [waOpen, setWaOpen] = useState(false);

  const waLinks = useMemo(
    () =>
      WHATSAPP_NUMBERS.map((n) => ({
        num: n,
        href: waLink(n),
        show: `+${n}`,
      })),
    []
  );

  return (
    // ✅ LEFT SIDE HERE
    <div className="fixed bottom-5 left-5 z-[9999] flex flex-col items-start gap-3">
      {/* WhatsApp mini list */}
      {waOpen && (
        <div className="w-64 max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/95 shadow-2xl backdrop-blur">
          <div className="px-4 py-3 border-b border-white/10">
            <div className="text-sm font-bold text-white">WhatsApp</div>
            <div className="text-xs text-neutral-400">Choose a number to chat</div>
          </div>
          <div className="p-3 space-y-2">
            {waLinks.map((w) => (
              <a
                key={w.num}
                href={w.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200 hover:bg-emerald-500/15"
              >
                <span className="font-semibold">{w.show}</span>
                <WhatsAppIcon className="h-5 w-5 text-white" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* WhatsApp main floating */}
      <FloatingBtn
        onClick={() => setWaOpen((p) => !p)}
        label="WhatsApp"
        bgClass="bg-[#25D366] hover:bg-[#1fb85a]"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </FloatingBtn>

      {/* Instagram */}
      <FloatingBtn
        href={SOCIAL.instagram}
        label="Instagram"
        bgClass="bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#515bd4]"
      >
        <InstagramIcon className="h-6 w-6" />
      </FloatingBtn>

      {/* LinkedIn */}
      <FloatingBtn
        href={SOCIAL.linkedin}
        label="LinkedIn"
        bgClass="bg-[#0A66C2] hover:bg-[#0959aa]"
      >
        <LinkedInIcon className="h-6 w-6" />
      </FloatingBtn>
    </div>
  );
};

export default FloatingSocials;