// src/pages/CoreValues.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  ShieldCheck,
  Settings,
  BadgeCheck,
  Users,
  HardHat,
  Truck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const CoreValues = () => {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const values = [
    {
      icon: ShieldCheck,
      title: "Technical Integrity",
      desc: "We commit to honest specifications, transparent quality practices, and responsible manufacturing.",
    },
    {
      icon: Settings,
      title: "Manufacturing Discipline",
      desc: "Controlled raw materials, standardized processing, and repeatable outputs at scale.",
    },
    {
      icon: BadgeCheck,
      title: "Consistency & Quality",
      desc: "Batch-level verification to ensure predictable lining behavior and stable furnace performance.",
    },
    {
      icon: Users,
      title: "Long-term Partnership",
      desc: "We focus on steelmakers’ uptime—supporting productivity, reliability, and continuity.",
    },
    {
      icon: HardHat,
      title: "Safety & Responsibility",
      desc: "Safe operations, clear processes, and a culture of accountability across teams.",
    },
    {
      icon: Truck,
      title: "Supply Reliability",
      desc: "Operational planning + logistics control to support dispatch schedules and delivery timelines.",
    },
  ];

  const practices = [
    "Controlled raw material selection",
    "Standard operating procedures (SOPs) across processing",
    "Batch-level quality verification for repeatability",
    "Focused product category for deeper technical control",
  ];

  // motion helpers (avoid warnings when reduceMotion = true)
  const inViewBlock = (amount = 0.25) =>
    reduceMotion
      ? { initial: false }
      : {
          variants: container,
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true, amount },
        };

  const inViewItem = reduceMotion ? {} : { variants: item };

  return (
    <main className="overflow-x-hidden bg-gradient-to-b from-neutral-50 via-white to-orange-50/30">
      <section className="relative overflow-hidden py-12 sm:py-14 lg:py-20">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-24 h-[520px] w-[520px] rounded-full bg-orange-300/25 blur-[140px]" />
          <div className="absolute -right-40 -bottom-28 h-[520px] w-[520px] rounded-full bg-amber-200/30 blur-[140px]" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          {/* header */}
          <motion.div {...inViewBlock(0.28)} className="mx-auto max-w-3xl text-center">
            <motion.div
              {...inViewItem}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs sm:text-sm font-semibold text-orange-700 shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Our Core Values
            </motion.div>

            <motion.h1
              {...inViewItem}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-neutral-900"
            >
              Values that drive{" "}
              <span className="bg-gradient-to-r from-orange-700 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                consistent performance
              </span>
            </motion.h1>

            <motion.p
              {...inViewItem}
              className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-neutral-600"
            >
              At SSGT Group, our values are built around disciplined manufacturing,
              repeatable quality, and long-term partnership with induction furnace steelmakers.
            </motion.p>
          </motion.div>

          {/* values grid */}
          <motion.div
            {...(reduceMotion
              ? { initial: false }
              : {
                  variants: container,
                  initial: "hidden",
                  whileInView: "show",
                  viewport: { once: true, amount: 0.2 },
                })}
            className="mt-8 sm:mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  {...inViewItem}
                  whileHover={
                    reduceMotion ? undefined : { y: -6, transition: { duration: 0.2 } }
                  }
                  className="w-full rounded-2xl border border-neutral-200 bg-white/90 p-5 sm:p-6 shadow-sm backdrop-blur"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="grid h-11 w-11 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl bg-orange-100 text-orange-700 ring-1 ring-orange-200">
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* ✅ min-w-0 so long text wraps nicely on small screens */}
                    <div className="min-w-0">
                      <div className="text-[15px] sm:text-base font-extrabold text-neutral-900">
                        {v.title}
                      </div>
                      <div className="mt-1.5 text-[13px] sm:text-sm leading-relaxed text-neutral-600">
                        {v.desc}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* practices + CTA */}
          <div className="mt-8 sm:mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            {/* practices */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
              className="w-full rounded-2xl border border-neutral-200 bg-white/90 p-5 sm:p-6 shadow-sm"
            >
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.22em] text-orange-700">
                How we live these values
              </div>

              <ul className="mt-4 space-y-3">
                {practices.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-orange-600" />
                    <p className="min-w-0 text-[13px] sm:text-sm leading-relaxed text-neutral-700">
                      {p}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="w-full rounded-2xl border border-orange-200 bg-gradient-to-b from-orange-50 to-white p-5 sm:p-6 shadow-sm"
            >
              <div className="text-base sm:text-lg font-black text-neutral-900">
                Want to work with SSGT Group?
              </div>
              <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-neutral-600">
                Let’s discuss your induction furnace requirements and supply expectations.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <NavLink
                  to="/contact"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
                >
                  Contact Us <ArrowRight className="h-4 w-4" />
                </NavLink>
                <NavLink
                  to="/products"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50"
                >
                  View Products
                </NavLink>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CoreValues;