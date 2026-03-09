// src/components/Manufacturing.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Building2,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Award,
  Shield,
  Zap,
  Lightbulb,
  ChevronRight,
  Factory,
  ArrowRight,
} from "lucide-react";

import Img1 from "../Img/manu2.jpg";
import Img2 from "../Img/manu3.jpg";
import Img3 from "../Img/manu5.jpg";

/* ── Smart Image ── */
const SmartImg = ({ src, alt, priority = false, className = "" }) => {
  const [status, setStatus] = useState("loading");

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {status === "loading" && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-200 via-neutral-100 to-orange-50" />
      )}

      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        onLoad={() => setStatus("ok")}
        onError={() => setStatus("fail")}
        className={`h-full w-full object-cover transition-all duration-700 ${
          status === "ok"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-[1.02]"
        }`}
      />

      {status === "fail" && (
        <div className="absolute inset-0 grid place-items-center bg-neutral-100 text-xs text-neutral-500">
          Image unavailable
        </div>
      )}
    </div>
  );
};

/* ── Counter (formatted numbers) ── */
const Counter = ({
  end,
  decimals = 0,
  suffix = "",
  duration = 1.4,
  useGrouping = true, // ✅ NEW: control comma grouping
}) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setVal(end);
      return;
    }

    let raf;
    let t0 = null;

    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const run = (ts) => {
      if (t0 === null) t0 = ts;
      const p = Math.min((ts - t0) / (duration * 1000), 1);
      setVal(end * ease(p));
      if (p < 1) raf = requestAnimationFrame(run);
    };

    raf = requestAnimationFrame(run);
    return () => raf && cancelAnimationFrame(raf);
  }, [inView, reduceMotion, end, duration]);

  const num = decimals > 0 ? Number(val.toFixed(decimals)) : Math.round(val);

  // ✅ full numbers with commas (optional)
  const display = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping, // ✅ NEW: for year 2006, set false
  }).format(num);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
};

/* ══════════════════════════════════════════ */
const Manufacturing = ({ withHeaderOffset = true }) => {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);
  const near = useInView(rootRef, { once: true, margin: "600px 0px" });

  useEffect(() => {
    if (!near) return;
    [Img1, Img2, Img3].forEach((s) => {
      const i = new Image();
      i.src = s;
    });
  }, [near]);

  const up = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.12 },
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
        };

  /* ── Data ── */
  const stats = [
    {
      end: 2006,
      label: "Established",
      icon: Building2,
      accent: "from-orange-600 to-amber-600",
      iconBox: "bg-orange-50 ring-orange-200 text-orange-700",
      useGrouping: false, // ✅ FIX: no comma for year (2006)
    },
    {
      end: 3,
      label: "Plants",
      icon: Factory,
      accent: "from-sky-600 to-blue-700",
      iconBox: "bg-sky-50 ring-sky-200 text-sky-700",
    },
    {
      end: 120000,
      decimals: 0,
      suffix: " MT",
      label: "Current Capacity",
      icon: Zap,
      accent: "from-emerald-600 to-teal-700",
      iconBox: "bg-emerald-50 ring-emerald-200 text-emerald-700",
    },
    {
      end: 350000,
      decimals: 0,
      suffix: "+ MT", // ✅ target capacity should show plus
      label: "Target Capacity",
      icon: TrendingUp,
      accent: "from-violet-600 to-purple-700",
      iconBox: "bg-violet-50 ring-violet-200 text-violet-700",
    },
  ];

  const sections = [
    {
      title: "Manufacturing Strength & Infrastructure",
      icon: Building2,
      image: Img1,
      tag: "Our Foundation",
      num: "01",
      accent: "from-orange-600 to-amber-600",
      content:
        "SSGT Group's manufacturing is built around process discipline and repeatability. From raw material selection to final packing, every step is engineered to deliver stable furnace performance — at scale, with the consistency our customers depend on.",
      bullets: [
        "Multi-unit setup with common SOPs across all facilities",
        "Installed capacity ~120,000 MT/year with scalable production lines",
        "Controlled crushing, grading & mixing for repeatable particle distribution",
        "Full batch identification, documentation and dispatch traceability",
      ],
      extraTitle: "Key Capabilities",
      extra: [
        "Reliable high-volume supply for continuous steel operations",
        "Product grades aligned to furnace size, lining practice & conditions",
        "Consistency-focused processing to minimize batch-to-batch variation",
      ],
    },
    {
      title: "Strategic Location Advantage",
      icon: MapPin,
      image: Img2,
      tag: "Location & Logistics",
      num: "02",
      accent: "from-sky-600 to-blue-700",
      content:
        "Located in the heart of Central India's steel belt, our plants are positioned to reduce turnaround time and improve dispatch planning — giving customers faster response, predictable schedules, and closer on-ground coordination.",
      bullets: [
        "Reduced lead time to key steel-producing clusters",
        "Support for planned dispatch + just-in-time supply",
        "Quick-response capability for urgent and seasonal orders",
        "Tighter feedback loop for on-site performance issues",
      ],
    },
    {
      title: "Expansion & Future-Ready Manufacturing",
      icon: TrendingUp,
      image: Img3,
      tag: "Upcoming Expansion",
      num: "03",
      accent: "from-emerald-600 to-teal-700",
      content:
        "Our upcoming Raipur facility is engineered for automation, higher throughput, and tighter process control — growing capacity without compromising the consistency our customers have relied on for years.",
      bullets: [
        "Target roadmap capacity: 350,000+ MT/year",
        "Advanced material handling & shop-floor flow optimization",
        "Higher-capacity mixers and precision grading units",
        "Enhanced dust control & safety infrastructure upgrades",
        "Stronger in-process monitoring for tighter quality control",
      ],
    },
  ];

  const qualityAreas = [
    {
      title: "Raw Material Control",
      icon: Shield,
      grad: "from-blue-600 to-blue-800",
      light: "bg-blue-50",
      border: "border-blue-200/70",
      iconText: "text-blue-700",
      dot: "bg-blue-600",
      items: [
        "Approved sourcing with structured supplier evaluation",
        "Incoming inspection for composition and consistency",
        "Defined acceptance & rejection criteria",
        "Traceability maintained from source to finished batch",
      ],
    },
    {
      title: "Process-Controlled Production",
      icon: Zap,
      grad: "from-orange-600 to-orange-800",
      light: "bg-orange-50",
      border: "border-orange-200/70",
      iconText: "text-orange-700",
      dot: "bg-orange-600",
      items: [
        "Stable crushing for consistent grain characteristics",
        "Particle size control for predictable furnace behavior",
        "Calibrated mixing for uniform binder dispersion",
        "Batch tracking across all production cycles",
      ],
    },
    {
      title: "Testing & Verification",
      icon: Award,
      grad: "from-emerald-600 to-emerald-800",
      light: "bg-emerald-50",
      border: "border-emerald-200/70",
      iconText: "text-emerald-700",
      dot: "bg-emerald-600",
      items: [
        "Routine lab checks on all production samples",
        "Batch-wise verification before dispatch",
        "Supervision by experienced technical team",
        "Continuous improvement via customer feedback data",
      ],
    },
  ];

  const commitments = [
    {
      text: "Long-term Customer Partnerships",
      desc: "Building trust through consistent delivery",
      icon: Lightbulb,
      grad: "from-amber-500 to-orange-600",
    },
    {
      text: "Process Transparency & Traceability",
      desc: "Full visibility from raw material to dispatch",
      icon: CheckCircle2,
      grad: "from-sky-500 to-blue-700",
    },
    {
      text: "Continuous Improvement Culture",
      desc: "Evolving with every batch and feedback",
      icon: TrendingUp,
      grad: "from-violet-500 to-purple-700",
    },
    {
      text: "Capacity Planning Ahead of Demand",
      desc: "Investing early so supply never falls short",
      icon: Award,
      grad: "from-emerald-500 to-teal-700",
    },
  ];

  return (
    <section
      ref={rootRef}
      id="manufacturing"
      className={[
        "relative w-full overflow-hidden",
        "bg-gradient-to-b from-neutral-50 via-white to-orange-50/30",
        "py-16 lg:py-24",
        "scroll-mt-24",
        withHeaderOffset ? "-mt-24 pt-24" : "",
      ].join(" ")}
    >
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-24 h-[560px] w-[560px] rounded-full bg-gradient-to-r from-orange-300/35 to-amber-200/25 blur-[140px]" />
        <div className="absolute -right-32 -bottom-28 h-[520px] w-[520px] rounded-full bg-gradient-to-l from-amber-200/25 to-orange-300/20 blur-[120px]" />
      </div>

      {/* subtle dots */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.12) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        {/* HERO */}
        <motion.div {...up(0)} className="mx-auto max-w-3xl text-center">
          <motion.h1
            {...up(0.08)}
            className="mx-auto mt-7 max-w-5xl text-neutral-900 font-black tracking-tight leading-[1.05]
                       text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block">Built to Perform.</span>
            <span className="mt-2 block bg-gradient-to-r from-orange-700 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Built to Last.
            </span>
          </motion.h1>

          <p className="mt-5 text-lg leading-relaxed text-neutral-700 md:text-xl">
            Strong infrastructure, process control, and quality-first execution —
            delivering dependable silica ramming mass for induction furnace
            operations.
          </p>

          <motion.div
            {...up(0.12)}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#facilities"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/30"
            >
              Explore Facilities
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#quality"
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white/90 px-7 py-3.5 text-sm font-semibold text-neutral-900 shadow-lg shadow-neutral-200/40"
            >
              Quality Standards
            </a>
          </motion.div>
        </motion.div>

        {/* STATS */}
        <motion.div {...up(0.15)} className="mx-auto mt-10 max-w-5xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  {...up(0.18 + i * 0.05)}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -6,
                          boxShadow:
                            "0 20px 45px -22px rgba(249,115,22,0.35)",
                          transition: { duration: 0.2 },
                        }
                  }
                  className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white/90 p-5 shadow-xl shadow-neutral-200/40 backdrop-blur-sm"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${s.accent}`}
                  />

                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={[
                        "grid h-11 w-11 shrink-0 place-items-center rounded-2xl ring-1",
                        s.iconBox,
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="text-right">
                      <div className="text-[11px] font-black uppercase tracking-[0.18em] text-neutral-400">
                        {s.label}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl">
                    <Counter
                      end={s.end}
                      decimals={s.decimals ?? 0}
                      suffix={s.suffix ?? ""}
                      duration={1.4}
                      useGrouping={s.useGrouping ?? true} // ✅ FIX applied
                    />
                  </div>

                  <div className="mt-1 text-xs text-neutral-500">
                    Verified operational metric
                  </div>

                  <div className="pointer-events-none absolute -bottom-8 -right-8 h-20 w-20 rounded-full bg-orange-400/10" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Facilities */}
        <div id="facilities" className="scroll-mt-24 mt-14 space-y-10 lg:mt-16">
          {sections.map((s, idx) => {
            const Icon = s.icon;
            const flip = idx % 2 === 1;

            return (
              <motion.article
                key={s.title}
                {...up(0)}
                className="grid items-stretch overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-200/40 md:grid-cols-2"
              >
                {/* Image */}
                <div className={`relative ${flip ? "md:order-2" : ""}`}>
                  <div className="h-[240px] sm:h-[320px] md:h-full">
                    <SmartImg
                      src={s.image}
                      alt={s.title}
                      priority={idx === 0}
                      className="h-full w-full"
                    />
                  </div>

                  <div className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white/95 text-sm font-black text-neutral-900 shadow-md">
                    {s.num}
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 shadow-md">
                    <div
                      className={`grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br ${s.accent} text-white`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-bold text-neutral-700">
                      {s.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex flex-col justify-center p-7 sm:p-8 lg:p-12 ${
                    flip ? "md:order-1" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-1 w-12 rounded-full bg-gradient-to-r ${s.accent}`}
                    />
                    <span className="text-[11px] font-black uppercase tracking-[0.18em] text-neutral-400">
                      {s.tag}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-black leading-snug text-neutral-900 md:text-3xl">
                    {s.title}
                  </h2>

                  <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 md:text-base">
                    {s.content}
                  </p>

                  <div className="my-6 h-px bg-neutral-100" />

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                        <span className="h-px w-4 bg-neutral-300" />
                        Key Points
                      </p>
                      <ul className="space-y-2.5">
                        {s.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2.5 text-[13.5px] text-neutral-700 md:text-sm"
                          >
                            <CheckCircle2 className="mt-[3px] h-4 w-4 shrink-0 text-orange-600" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {s.extra?.length > 0 && (
                      <div>
                        <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                          <span className="h-px w-4 bg-neutral-300" />
                          {s.extraTitle ?? "Capabilities"}
                        </p>
                        <ul className="space-y-2.5">
                          {s.extra.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2.5 text-[13.5px] text-neutral-700 md:text-sm"
                            >
                              <ChevronRight className="mt-[3px] h-4 w-4 shrink-0 text-orange-500" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Quality */}
        <div id="quality" className="scroll-mt-24 mt-16 lg:mt-20">
          <motion.div {...up(0)} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-orange-700">
              <Shield className="h-3.5 w-3.5" />
              Quality
            </span>
            <h2 className="mt-5 text-3xl font-black text-neutral-900 md:text-4xl lg:text-5xl">
              Quality Assurance &amp; Discipline
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-600 md:text-lg">
              Quality is built into sourcing, processing, and verification so
              performance stays stable in real furnace conditions.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {qualityAreas.map((q, i) => {
              const Icon = q.icon;
              return (
                <motion.div
                  key={q.title}
                  {...up(i * 0.08)}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -6, transition: { duration: 0.2 } }
                  }
                  className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-xl shadow-neutral-200/40"
                >
                  <div
                    className={`h-1.5 w-full rounded-full bg-gradient-to-r ${q.grad}`}
                  />
                  <div className="mt-6">
                    <div
                      className={`inline-flex items-center justify-center rounded-2xl border ${q.border} ${q.light} p-3`}
                    >
                      <Icon className={`h-6 w-6 ${q.iconText}`} />
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-neutral-900">
                      {q.title}
                    </h3>

                    <ul className="mt-4 space-y-3">
                      {q.items.map((it) => (
                        <li
                          key={it}
                          className="flex items-start gap-3 text-sm text-neutral-700"
                        >
                          <div
                            className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${q.dot}`}
                          />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Commitments */}
        <motion.div {...up(0)} className="mt-16 lg:mt-20">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-orange-700">
              <Lightbulb className="h-3.5 w-3.5" />
              Our Promise
            </span>
            <h2 className="mt-5 text-3xl font-black text-neutral-900 md:text-4xl lg:text-5xl">
              Commitment Beyond Manufacturing
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.text}
                  {...up(i * 0.07)}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -6, transition: { duration: 0.2 } }
                  }
                  className="rounded-3xl border border-neutral-200 bg-white p-7 text-center shadow-xl shadow-neutral-200/40"
                >
                  <div
                    className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${c.grad} text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-5 text-sm font-bold text-neutral-900">
                    {c.text}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                    {c.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-orange-300" />
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-orange-300" />
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-neutral-600 md:text-lg">
            This philosophy has enabled us to grow steadily while maintaining{" "}
            <span className="font-semibold text-neutral-800">
              trust, reliability, and technical credibility
            </span>{" "}
            across our customer base.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Manufacturing;