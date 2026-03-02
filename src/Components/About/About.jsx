// src/components/About.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Factory,
  ShieldCheck,
  Truck,
  Target,
  Users,
  Beaker,
  ArrowRight,
} from "lucide-react";

import AboutImg from "../Img/plant.jpg";
import AboutImg2 from "../Img/contact.jpg";

/** Image component: skeleton + fade-in + error fallback */
const SmartImage = ({
  src,
  alt,
  wrapperClassName = "",
  imgClassName = "",
  priority = false,
  motionProps = {},
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative h-full w-full ${wrapperClassName}`}>
      {!loaded && !failed && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200" />
      )}

      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        draggable="false"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
        {...motionProps}
      />

      {failed && (
        <div className="absolute inset-0 grid place-items-center bg-neutral-100 text-xs text-neutral-600">
          Image failed to load
        </div>
      )}
    </div>
  );
};

/** Counter: runs only when visible (fix CPU + improve image load feel) */
const AnimatedCounter = ({ value, suffix, duration = 2.5 }) => {
  // For values like "24/7" don’t animate; show as-is
  if (String(value).includes("/")) {
    return (
      <span>
        {value}
        <span className="text-orange-500 font-black">{suffix}</span>
      </span>
    );
  }

  const [displayValue, setDisplayValue] = useState(0);
  const spanRef = useRef(null);

  const isInView = useInView(spanRef, {
    once: true,
    margin: "0px 0px -20% 0px",
  });

  const numericValue = parseInt(String(value).replace(/[^0-9]/g, ""), 10) || 0;

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuad = 1 - Math.pow(1 - progress, 2);
      const currentValue = Math.floor(numericValue * easeOutQuad);

      setDisplayValue(currentValue);

      if (progress < 1) animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => animationId && cancelAnimationFrame(animationId);
  }, [isInView, numericValue, duration]);

  return (
    <span ref={spanRef}>
      {displayValue.toLocaleString()}
      <span className="text-orange-500 font-black">{suffix}</span>
    </span>
  );
};

const About = () => {
  const reduceMotion = useReducedMotion();

  // Preload images when About section is near viewport (fix “buffering” feel)
  const sectionRef = useRef(null);
  const nearView = useInView(sectionRef, { once: true, margin: "700px 0px" });

  useEffect(() => {
    if (!nearView) return;
    [AboutImg, AboutImg2].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [nearView]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const highlights = [
    {
      icon: Factory,
      title: "10,000+ MT / Month",
      desc: "Installed production capacity exceeding 10,000 metric tons per month.",
    },
    {
      icon: Beaker,
      title: "Boron & Boric-Acid Formulations",
      desc: "Engineered for consistent lining life, thermal stability, and reliable performance.",
    },
    {
      icon: ShieldCheck,
      title: "Disciplined Manufacturing",
      desc: "Controlled raw materials, standardized processing, and batch-level verification.",
    },
    {
      icon: Users,
      title: "40+ Steel Plants Supplied",
      desc: "Serving Central & Eastern India across induction furnace capacities.",
    },
    {
      icon: Target,
      title: "Single-Category Focus",
      desc: "Deeper technical understanding, tighter process control, dependable execution.",
    },
    {
      icon: Truck,
      title: "In-house Logistics",
      desc: "Better control on dispatch schedules and delivery timelines.",
    },
  ];

  const stats = [
    { value: "10,000+", label: "MT / Month Capacity" },
    { value: "40+", label: "Steel Plants Served" },
    { value: "100%", label: "Batch Verified" },
    { value: "24/7", label: "Operational Readiness" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-orange-50/30 py-16 lg:py-24"
    >
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -left-32 -top-20 h-[560px] w-[560px] rounded-full bg-gradient-to-r from-orange-300/40 to-amber-200/30 blur-[140px]"
        />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -right-32 -bottom-24 h-[520px] w-[520px] rounded-full bg-gradient-to-l from-amber-200/30 to-orange-300/20 blur-[120px]"
        />
      </div>

      {/* Subtle moving dots pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        {/* Header */}
        <motion.div
          variants={reduceMotion ? undefined : container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={reduceMotion ? undefined : item}
            initial={{ scale: 0.9 }}
            whileInView={reduceMotion ? undefined : { scale: 1 }}
            viewport={{ once: true }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-orange-200 bg-gradient-to-r from-orange-50 to-white px-5 py-2.5 text-sm font-semibold text-orange-700 shadow-lg shadow-orange-200/40"
          >
            <motion.span
              animate={reduceMotion ? undefined : { rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block h-2 w-2 rounded-full bg-orange-500"
            />
            About SSGT Group
          </motion.div>

          <motion.h2
            variants={reduceMotion ? undefined : item}
            className="text-4xl font-black leading-tight tracking-tight text-neutral-900 md:text-5xl lg:text-6xl"
          >
            Built for{" "}
            <motion.span
              initial={
                reduceMotion ? undefined : { backgroundPosition: "0% 50%" }
              }
              whileInView={
                reduceMotion ? undefined : { backgroundPosition: "100% 50%" }
              }
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              Induction Furnace
            </motion.span>{" "}
            Performance
          </motion.h2>

          <motion.p
            variants={reduceMotion ? undefined : item}
            className="mt-5 text-lg leading-relaxed text-neutral-700 md:text-xl"
          >
            SSGT Group is a specialized industrial manufacturer focused on silica
            ramming mass for induction furnace applications in the steel and
            foundry sectors.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              whileHover={
                reduceMotion ? undefined : { y: -8, transition: { duration: 0.2 } }
              }
              className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 p-5 text-center shadow-lg shadow-neutral-200/40 backdrop-blur-sm transition-all"
            >
              <div className="text-3xl font-black text-orange-700 md:text-4xl">
                <AnimatedCounter
                  value={s.value}
                  suffix={
                    s.value.includes("+")
                      ? "+"
                      : s.value.includes("%")
                      ? "%"
                      : ""
                  }
                  duration={2.5}
                />
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-neutral-600">
                {s.label}
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-orange-400/10"
                animate={reduceMotion ? undefined : { scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Main content */}
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2">
          {/* Left column with images */}
          <div className="order-1 space-y-6">
            {/* Image 1 */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -30 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-300/30"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <SmartImage
                  src={AboutImg}
                  alt="SSGT Group manufacturing facility"
                  motionProps={{
                    initial: reduceMotion ? false : { scale: 1.05 },
                    whileInView: reduceMotion ? undefined : { scale: 1 },
                    viewport: { once: true },
                    transition: { duration: 1.2, ease: "easeOut" },
                    whileHover: reduceMotion
                      ? undefined
                      : { scale: 1.08, transition: { duration: 0.6 } },
                  }}
                />
              </div>

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={reduceMotion ? undefined : { rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="h-3 w-3 rounded-full bg-orange-500"
                  />
                  <p className="text-sm font-medium text-white/90">
                    Manufacturing Excellence • Quality Control
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Image 2 */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-300/30"
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <SmartImage
                  src={AboutImg2}
                  alt="SSGT Group industrial operations"
                  motionProps={{
                    initial: reduceMotion ? false : { scale: 1.1, rotate: 1 },
                    whileInView: reduceMotion ? undefined : { scale: 1, rotate: 0 },
                    viewport: { once: true },
                    transition: { duration: 1.5, ease: "easeOut" },
                    whileHover: reduceMotion
                      ? undefined
                      : { scale: 1.05, transition: { duration: 0.4 } },
                  }}
                />
              </div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-md"
              >
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-xs font-medium text-white">
                    Operational
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column text */}
          <motion.div
            variants={reduceMotion ? undefined : container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="order-2"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: Factory,
                  title: "Who We Are",
                  content: (
                    <>
                      <span className="font-semibold text-neutral-900">
                        SSGT Group
                      </span>{" "}
                      operates its manufacturing and supply activities through{" "}
                      <span className="font-semibold text-neutral-900">
                        SSGT RefraTech Pvt. Ltd.
                      </span>
                      , its dedicated refractory manufacturing arm.
                    </>
                  ),
                },
                {
                  icon: Beaker,
                  title: "Capacity",
                  content: (
                    <>
                      Installed production capacity exceeding{" "}
                      <span className="font-semibold text-neutral-900">
                        10,000 metric tons per month
                      </span>
                      , among the leading producers of boron-based silica ramming
                      mass in Central India.
                    </>
                  ),
                },
                {
                  icon: ShieldCheck,
                  title: "Products",
                  content: (
                    <>
                      Boron-based and boric-acid-based formulations designed for
                      consistent lining life, thermal stability, and reliable
                      performance in demanding operations.
                    </>
                  ),
                },
                {
                  icon: Target,
                  title: "Quality",
                  content: (
                    <>
                      Controlled raw material selection, standardized processing,
                      and{" "}
                      <span className="font-semibold text-neutral-900">
                        batch-level verification
                      </span>{" "}
                      for repeatable behavior across large-volume supplies.
                    </>
                  ),
                },
              ].map((block, idx) => {
                const Icon = block.icon;
                return (
                  <motion.div
                    key={block.title}
                    variants={reduceMotion ? undefined : item}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -4,
                            boxShadow:
                              "0 20px 40px -15px rgba(249, 115, 22, 0.15)",
                            transition: { duration: 0.2 },
                          }
                    }
                    className="rounded-2xl border border-neutral-200 bg-white/90 p-5 shadow-lg shadow-neutral-200/30 backdrop-blur-sm"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <motion.div
                        whileHover={reduceMotion ? undefined : { rotate: 15 }}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600 ring-1 ring-orange-200"
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      <div className="h-1 w-6 rounded-full bg-orange-500" />
                      <span className="text-xs font-extrabold uppercase tracking-widest text-orange-700">
                        {block.title}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-700">
                      {block.content}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-orange-50/50 p-6 shadow-2xl shadow-orange-200/30"
            >
              <p className="text-sm leading-relaxed text-neutral-700">
                SSGT Group supplies silica ramming mass to more than{" "}
                <span className="font-semibold text-neutral-900">
                  40 steel plants
                </span>{" "}
                across Central and Eastern India. The Group remains deliberately
                focused on a single product category, supported by in-house
                logistics for better dispatch and delivery control.
              </p>

              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                Built on principles of{" "}
                <span className="font-semibold text-neutral-900">
                  technical integrity
                </span>
                ,{" "}
                <span className="font-semibold text-neutral-900">
                  manufacturing discipline
                </span>
                , and{" "}
                <span className="font-semibold text-neutral-900">
                  long-term partnership with induction furnace steelmakers
                </span>
                .
              </p>

              <motion.div
                className="mt-6 flex flex-col gap-3 sm:flex-row"
                initial={{ opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 1.05,
                          boxShadow:
                            "0 10px 30px -5px rgba(249, 115, 22, 0.4)",
                        }
                  }
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  <NavLink
                    to="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/30"
                  >
                    Contact Us
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </NavLink>
                </motion.div>

                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  <NavLink
                    to="/products"
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white/90 px-6 py-3.5 text-sm font-semibold text-neutral-900 shadow-lg shadow-neutral-200/40"
                  >
                    View Products
                  </NavLink>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          variants={reduceMotion ? undefined : container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16"
        >
          <motion.h3
            variants={reduceMotion ? undefined : item}
            className="mb-8 text-center text-2xl font-black text-neutral-900 md:text-3xl"
          >
            Why{" "}
            <span className="bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
              SSGT Group
            </span>
          </motion.h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, idx) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  variants={reduceMotion ? undefined : item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 * idx }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -6,
                          boxShadow:
                            "0 20px 40px -15px rgba(249, 115, 22, 0.2)",
                          transition: { duration: 0.2 },
                        }
                  }
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 p-6 shadow-lg shadow-neutral-200/30 backdrop-blur-sm"
                >
                  <motion.div
                    className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-orange-400/10"
                    animate={reduceMotion ? undefined : { scale: [1, 1.3, 1] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: idx * 0.5,
                    }}
                  />

                  <div className="relative flex items-start gap-4">
                    <motion.div
                      whileHover={
                        reduceMotion ? undefined : { rotate: 15, scale: 1.1 }
                      }
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 text-orange-700 ring-2 ring-orange-200"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <div className="text-base font-bold text-neutral-900">
                        {h.title}
                      </div>
                      <div className="mt-2 text-sm leading-relaxed text-neutral-600">
                        {h.desc}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;