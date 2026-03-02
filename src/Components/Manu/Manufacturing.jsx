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
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-stone-200 via-stone-100 to-orange-50" />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        onLoad={() => setStatus("ok")}
        onError={() => setStatus("fail")}
        className={`h-full w-full object-cover transition-all duration-700 ${status === "ok" ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
          }`}
      />
      {status === "fail" && (
        <div className="absolute inset-0 grid place-items-center bg-stone-100 text-xs text-stone-400">
          Image unavailable
        </div>
      )}
    </div>
  );
};

/* ── Counter ── */
const Counter = ({ end, decimals = 0, suffix = "", duration = 1.4 }) => {
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
    let raf, t0;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const run = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / (duration * 1000), 1);
      setVal(end * ease(p));
      if (p < 1) raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => raf && cancelAnimationFrame(raf);
  }, [inView, reduceMotion, end, duration]);

  const display =
    decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
};

/* ══════════════════════════════════════════ */
const Manufacturing = () => {
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
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
      };

  /* ── Data ── */
  const stats = [
    { end: 2006, label: "Established", icon: Building2 },
    { end: 3, label: "Plants", icon: Factory },
    {
      end: 1.2,
      decimals: 1,
      suffix: " L MT",
      label: "Current Capacity",
      icon: Zap,
    },
    {
      end: 3.5,
      decimals: 1,
      suffix: " L MT+",
      label: "Target Capacity",
      icon: TrendingUp,
    },
  ];

  const sections = [
    {
      title: "Manufacturing Strength & Infrastructure",
      icon: Building2,
      image: Img1,
      tag: "Our Foundation",
      num: "01",
      accent: "from-orange-500 to-amber-500",
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
      accent: "from-sky-500 to-blue-600",
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
      accent: "from-emerald-500 to-teal-600",
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
      grad: "from-blue-500 to-blue-700",
      iconBg: "bg-blue-600",
      light: "bg-blue-50",
      border: "border-blue-200/60",
      iconText: "text-blue-600",
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
      grad: "from-orange-500 to-orange-700",
      iconBg: "bg-orange-600",
      light: "bg-orange-50",
      border: "border-orange-200/60",
      iconText: "text-orange-600",
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
      grad: "from-emerald-500 to-emerald-700",
      iconBg: "bg-emerald-600",
      light: "bg-emerald-50",
      border: "border-emerald-200/60",
      iconText: "text-emerald-600",
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
      grad: "from-amber-400 to-orange-500",
    },
    {
      text: "Process Transparency & Traceability",
      desc: "Full visibility from raw material to dispatch",
      icon: CheckCircle2,
      grad: "from-sky-400 to-blue-600",
    },
    {
      text: "Continuous Improvement Culture",
      desc: "Evolving with every batch and feedback",
      icon: TrendingUp,
      grad: "from-violet-400 to-purple-600",
    },
    {
      text: "Capacity Planning Ahead of Demand",
      desc: "Investing early so supply never falls short",
      icon: Award,
      grad: "from-emerald-400 to-teal-600",
    },
  ];

  return (
    <section ref={rootRef} className="relative w-full overflow-hidden bg-[#fafaf8]">
      {/* ═══ HERO ═══ */}
      <div className="relative overflow-hidden bg-neutral-950 pb-20 pt-24 md:pb-28 md:pt-32 lg:pb-32 lg:pt-36">
        {/* bg image */}
        <div className="absolute inset-0">
          <SmartImg
            src={Img1}
            alt=""
            priority
            className="h-full w-full opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/70 to-neutral-950" />
        </div>

        {/* grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* top glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[800px] rounded-full bg-orange-500/8 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          {/* badge */}
          <motion.div {...up(0)} className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-orange-400 backdrop-blur-sm">
              <Factory className="h-3.5 w-3.5" />
              Since 2006
            </span>
          </motion.div>

          {/* heading */}
          <motion.h1
            {...up(0.08)}
            className="mx-auto mt-7 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Built to Perform.{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Built to Last.
            </span>
          </motion.h1>

          {/* sub */}
          <motion.p
            {...up(0.15)}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg"
          >
            Strong infrastructure, disciplined processes, and quality-first
            execution — delivering dependable silica ramming mass for induction
            furnace operations across India.
          </motion.p>

          {/* CTA */}
          <motion.div
            {...up(0.22)}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#facilities"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/30 hover:brightness-110"
            >
              Explore Facilities
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#quality"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-neutral-200 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/5"
            >
              Quality Standards
            </a>
          </motion.div>
        </div>

        {/* bottom curve */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V30C360 0 720 0 1080 30C1260 45 1360 55 1440 60V60H0Z"
              fill="#fafaf8"
            />
          </svg>
        </div>
      </div>

      {/* ═══ STATS ═══ */}
      <div className="relative z-10 mx-auto mt-6 max-w-5xl px-6">
        <motion.div
          {...up(0)}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4"
        >
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                {...up(i * 0.06)}
                className="group relative flex flex-col items-center rounded-xl border border-neutral-200/80 bg-white px-3 py-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-orange-200/60 hover:-translate-y-0.5"
              >
                <div className="mb-2 grid h-7 w-7 place-items-center rounded-lg bg-orange-50 text-orange-500 transition-colors group-hover:bg-orange-100">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xl font-black text-neutral-900 md:text-2xl">
                  <Counter
                    end={s.end}
                    decimals={s.decimals ?? 0}
                    suffix={s.suffix ?? ""}
                  />
                </span>
                <span className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                  {s.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ═══ SECTIONS ═══ */}
      <div
        id="facilities"
        className="mx-auto max-w-7xl space-y-20 px-6 py-24 lg:space-y-28 lg:px-12 lg:py-32"
      >
        {sections.map((s, idx) => {
          const Icon = s.icon;
          const flip = idx % 2 === 1;

          return (
            <motion.article
              key={s.title}
              {...up(0)}
              className="group grid items-stretch gap-0 overflow-hidden rounded-[1.75rem] border border-neutral-200/80 bg-white shadow-lg transition-shadow duration-500 hover:shadow-2xl md:grid-cols-2"
            >
              {/* Image */}
              <div
                className={`relative min-h-[280px] sm:min-h-[320px] md:min-h-full overflow-hidden ${flip ? "md:order-2" : ""
                  }`}
              >
                <SmartImg
                  src={s.image}
                  alt={s.title}
                  priority={idx === 0}
                  className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-neutral-950/15 to-transparent md:bg-gradient-to-r md:from-neutral-950/50 md:via-transparent md:to-transparent" />

                {/* number badge */}
                <div className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white/90 text-sm font-black text-neutral-900 shadow-md backdrop-blur-sm">
                  {s.num}
                </div>

                tag pill
                <div className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full bg-white/90 px-4 py-2 shadow-lg backdrop-blur-md">
                  <div
                    className={`grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br ${s.accent} text-white shadow-sm`}
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
                className={`flex flex-col justify-center p-7 sm:p-8 md:p-10 lg:p-14 ${flip ? "md:order-1" : ""
                  }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`h-1 w-10 rounded-full bg-gradient-to-r ${s.accent}`}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                    {s.tag}
                  </span>
                </div>

                <h2 className="text-2xl font-black leading-snug text-neutral-900 md:text-3xl xl:text-[2.25rem] xl:leading-tight">
                  {s.title}
                </h2>

                <p className="mt-4 text-[15px] leading-relaxed text-neutral-500 md:text-base lg:text-[17px]">
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
                          className="flex items-start gap-2.5 text-[13.5px] text-neutral-600 md:text-sm"
                        >
                          <CheckCircle2 className="mt-[3px] h-4 w-4 shrink-0 text-orange-500" />
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
                            className="flex items-start gap-2.5 text-[13.5px] text-neutral-600 md:text-sm"
                          >
                            <ChevronRight className="mt-[3px] h-4 w-4 shrink-0 text-orange-400" />
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

        {/* ═══ QUALITY ═══ */}
        <div id="quality">
          <motion.div {...up(0)} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-orange-600">
              <Shield className="h-3.5 w-3.5" />
              Quality
            </span>
            <h2 className="mt-5 text-3xl font-black text-neutral-900 md:text-4xl lg:text-5xl">
              Quality Assurance &amp; Discipline
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-500 md:text-lg">
              Quality is not a final step — it is built into sourcing,
              processing, and verification so performance stays stable in real
              furnace conditions.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {qualityAreas.map((q, i) => {
              const Icon = q.icon;
              return (
                <motion.div
                  key={q.title}
                  {...up(i * 0.08)}
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl hover:border-neutral-300/80"
                >
                  {/* top bar */}
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${q.grad}`}
                  />

                  <div className="p-7 md:p-8">
                    <div
                      className={`inline-flex items-center justify-center rounded-xl border ${q.border} ${q.light} p-3 mb-5 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`h-6 w-6 ${q.iconText}`} />
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                      {q.title}
                    </h3>

                    <ul className="mt-4 space-y-3">
                      {q.items.map((it) => (
                        <li
                          key={it}
                          className="flex items-start gap-3 text-sm text-neutral-600"
                        >
                          <div
                            className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${q.iconBg}`}
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

        {/* ═══ RESULT BANNER ═══ */}
        <motion.div {...up(0)} className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0">
            <SmartImg src={Img2} alt="" className="h-full w-full" />
            <div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-[3px]" />
          </div>
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-orange-500/20" />

          <div className="relative flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:p-14">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-400 mb-3">
                The Result
              </p>
              <p className="text-lg font-medium leading-relaxed text-neutral-300 md:text-xl lg:text-2xl">
                This disciplined approach ensures every batch performs{" "}
                <span className="font-extrabold text-white">
                  predictably inside the furnace
                </span>{" "}
                — minimizing lining failures, reducing downtime, and improving
                overall furnace efficiency.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ═══ COMMITMENTS ═══ */}
        <motion.div {...up(0)}>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-orange-600">
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
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-neutral-300"
                >
                  {/* bg number */}
                  <span className="pointer-events-none absolute right-3 top-1 text-[4.5rem] font-black leading-none text-neutral-50 transition-colors duration-300 group-hover:text-orange-50">
                    {i + 1}
                  </span>

                  <div
                    className={`relative mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${c.grad} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="relative mt-5 text-sm font-bold leading-snug text-neutral-800">
                    {c.text}
                  </p>
                  <p className="relative mt-1.5 text-xs leading-relaxed text-neutral-400">
                    {c.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* divider */}
          <div className="flex items-center justify-center gap-3 mt-14 mb-4">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-orange-300" />
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-orange-300" />
          </div>

          <motion.p
            {...up(0.1)}
            className="mx-auto max-w-2xl text-center text-[15px] leading-relaxed text-neutral-500 md:text-lg"
          >
            This philosophy has enabled us to grow steadily while maintaining{" "}
            <span className="font-semibold text-neutral-700">
              trust, reliability, and technical credibility
            </span>{" "}
            across our customer base.
          </motion.p>
        </motion.div>
      </div>

      {/* ═══ CTA ═══ */}
      <motion.div
        {...up(0)}
        className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

      </motion.div>
    </section>
  );
};

export default Manufacturing;