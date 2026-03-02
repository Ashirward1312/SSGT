// src/pages/Mission.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Target,
  Eye,
  ShieldCheck,
  Beaker,
  Truck,
  Users,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const Mission = () => {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const cardIn = {
    hidden: { opacity: 0, y: 22, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.65, ease: "easeOut" },
    },
  };

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Manufacturing Discipline",
      desc: "Controlled inputs, standardized processing, and batch-level verification.",
    },
    {
      icon: Beaker,
      title: "Consistent Performance",
      desc: "Formulations designed for stable furnace operations and predictable behavior.",
    },
    {
      icon: Users,
      title: "Steelmaker Reliability",
      desc: "Long-term partnerships focused on uptime, productivity, and reduced disruption.",
    },
    {
      icon: Truck,
      title: "Supply Continuity",
      desc: "In-house logistics support for better dispatch control and delivery timelines.",
    },
  ];

  return (
    <main className="bg-neutral-950">
      <section className="relative overflow-hidden py-16 lg:py-24">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_15%_10%,rgba(249,115,22,0.18),transparent_55%),radial-gradient(900px_circle_at_90%_85%,rgba(249,115,22,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-950" />

        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
          {/* Header */}
          <motion.div
            variants={reduceMotion ? undefined : container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              variants={reduceMotion ? undefined : item}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-200 backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Our Purpose
            </motion.div>

            <motion.h1
              variants={reduceMotion ? undefined : item}
              className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl lg:text-5xl"
            >
              Mission &{" "}
              <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
                Vision
              </span>
            </motion.h1>

            <motion.p
              variants={reduceMotion ? undefined : item}
              className="mt-4 text-base leading-relaxed text-neutral-300 md:text-lg"
            >
              Clear direction, disciplined execution, and reliable performance for induction
              furnace operations.
            </motion.p>
          </motion.div>

          {/* Mission + Vision Cards */}
          <motion.div
            variants={reduceMotion ? undefined : container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mt-10 grid max-w-5xl gap-4 lg:grid-cols-2"
          >
            {/* Mission */}
            <motion.div
              variants={reduceMotion ? undefined : cardIn}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -6, transition: { duration: 0.2 } }
              }
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:p-8"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

              <div className="relative flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/25">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white lg:text-2xl">
                    Mission
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-200 lg:text-base">
                    To manufacture and supply consistently performing silica ramming mass for
                    induction furnace applications, enabling stable furnace operations, extended
                    lining life, and reduced operational disruption for steel producers.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={reduceMotion ? undefined : cardIn}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -6, transition: { duration: 0.2 } }
              }
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:p-8"
            >
              <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

              <div className="relative flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/25">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white lg:text-2xl">
                    Vision
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-200 lg:text-base">
                    To be recognized as a trusted and technically respected Indian manufacturer of
                    silica ramming mass, known for manufacturing discipline, product consistency,
                    and long-term reliability in induction furnace operations.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <div className="mx-auto mt-10 max-w-5xl">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>

          {/* Pillars */}
          <motion.div
            variants={reduceMotion ? undefined : container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto mt-10 max-w-5xl"
          >
            <motion.h3
              variants={reduceMotion ? undefined : item}
              className="text-center text-lg font-extrabold text-white md:text-xl"
            >
              How we deliver on our mission
            </motion.h3>

            <motion.div
              variants={reduceMotion ? undefined : container}
              className="mt-6 grid gap-4 sm:grid-cols-2"
            >
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    variants={reduceMotion ? undefined : item}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -5, transition: { duration: 0.2 } }
                    }
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                  >
                    <div className="flex items-start gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-base font-extrabold text-white">
                          {p.title}
                        </div>
                        <div className="mt-1.5 text-sm leading-relaxed text-neutral-300">
                          {p.desc}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={reduceMotion ? undefined : item}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <NavLink
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:brightness-110"
              >
                Talk to Us
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </NavLink>

              <NavLink
                to="/core-values"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
              >
                View Core Values <ChevronRight className="h-4 w-4" />
              </NavLink>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Mission;