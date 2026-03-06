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
  CheckCircle2,
} from "lucide-react";

import AboutImg from "../Img/home1.jpg";
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

/** Counter: runs only when visible */
const AnimatedCounter = ({ value, suffix, duration = 2.5 }) => {
  if (String(value).includes("/")) {
    return (
      <span>
        {value}
        <span className="text-orange-600 font-black">{suffix}</span>
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
      <span className="text-orange-600 font-black">{suffix}</span>
    </span>
  );
};

const About = ({ withHeaderOffset = true }) => {
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef(null);
  const nearView = useInView(sectionRef, { once: true, margin: "700px 0px" });

  // preload 2 images only
  useEffect(() => {
    if (!nearView) return;
    [AboutImg, AboutImg2].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [nearView]);

  const stats = [
    { value: "10,000+", label: "MT / Month Capacity" },
    { value: "40+", label: "Steel Plants Served" },
    { value: "100%", label: "Batch Verified" },
    { value: "24/7", label: "Operational Readiness" },
  ];

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
      desc: "Deeper technical understanding, tighter control, dependable execution.",
    },
    {
      icon: Truck,
      title: "In-house Logistics",
      desc: "Better control on dispatch schedules and delivery timelines.",
    },
  ];

  const InfoCard = ({ icon: Icon, title, children }) => (
    <div className="rounded-3xl border border-neutral-200 bg-white/95 p-7 shadow-xl shadow-neutral-200/40 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 text-orange-700 ring-1 ring-orange-200">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-orange-700">
            {title}
          </div>
          <div className="mt-1 h-1 w-14 rounded-full bg-orange-500" />
        </div>
      </div>
      <div className="mt-4 text-[15px] leading-relaxed text-neutral-700 md:text-base">
        {children}
      </div>
    </div>
  );

  const Bullet = ({ children }) => (
    <div className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange-600" />
      <div className="text-sm text-neutral-700">{children}</div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className={[
        "relative overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-orange-50/30",
        "py-16 lg:py-24",
        "scroll-mt-24",
        withHeaderOffset ? "-mt-24 pt-24" : "",
      ].join(" ")}
    >
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-20 h-[560px] w-[560px] rounded-full bg-gradient-to-r from-orange-300/35 to-amber-200/25 blur-[140px]" />
        <div className="absolute -right-32 -bottom-24 h-[520px] w-[520px] rounded-full bg-gradient-to-l from-amber-200/25 to-orange-300/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-orange-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-orange-700 shadow-lg shadow-orange-200/40 backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
            About SSGT Group
          </div>

          <h2 className="text-4xl font-black leading-tight tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            Built for{" "}
            <span className="bg-gradient-to-r from-orange-700 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Induction Furnace
            </span>{" "}
            Performance
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-neutral-700 md:text-xl">
            SSGT Group is a specialized industrial manufacturer focused on silica
            ramming mass for induction furnace applications in the steel and
            foundry sectors.
          </p>
        </div>

        {/* stats */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 p-5 text-center shadow-lg shadow-neutral-200/40 backdrop-blur-sm"
            >
              <div className="text-3xl font-black text-orange-700 md:text-4xl">
                <AnimatedCounter
                  value={s.value}
                  suffix={
                    s.value.includes("+") ? "+" : s.value.includes("%") ? "%" : ""
                  }
                />
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-neutral-600">
                {s.label}
              </div>
              <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-orange-400/10" />
            </motion.div>
          ))}
        </motion.div>

        {/* ✅ Only TWO images, used ONCE each */}
        <div className="mt-14 space-y-10">
          {/* Block 1: Content + Image (AboutImg) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="grid items-center gap-6 lg:grid-cols-12"
          >
            {/* content */}
            <div className="lg:col-span-7">
              <div className="grid gap-5 md:grid-cols-2">
                <InfoCard icon={Factory} title="Who We Are">
                  <span className="font-semibold text-neutral-900">SSGT Group</span>{" "}
                  operates its manufacturing and supply activities through{" "}
                  <span className="font-semibold text-neutral-900">
                    SSGT RefraTech Pvt. Ltd.
                  </span>
                  , its dedicated refractory manufacturing arm.
                </InfoCard>

                <InfoCard icon={Beaker} title="Capacity">
                  Installed production capacity exceeding{" "}
                  <span className="font-semibold text-neutral-900">
                    10,000 metric tons per month
                  </span>
                  , among the leading producers of boron-based silica ramming mass
                  in Central India.
                </InfoCard>
              </div>

              <div className="mt-5 rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-orange-50/40 p-7 shadow-2xl shadow-orange-200/30">
                <div className="text-base font-black text-neutral-900">
                  What you get with SSGT
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Bullet>Consistent batches & predictable performance</Bullet>
                  <Bullet>Manufacturing discipline + batch-level checks</Bullet>
                  <Bullet>Scalable production for large volume supply</Bullet>
                  <Bullet>Reliable dispatch with in-house logistics</Bullet>
                </div>
              </div>
            </div>

            {/* image */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-300/30">
                <div className="h-[240px] sm:h-[340px] lg:h-[420px] overflow-hidden">
                  <SmartImage
                    src={AboutImg}
                    alt="SSGT Group manufacturing facility"
                    priority
                    motionProps={{
                      initial: reduceMotion ? false : { scale: 1.06 },
                      whileInView: reduceMotion ? undefined : { scale: 1 },
                      viewport: { once: true },
                      transition: { duration: 1.0, ease: "easeOut" },
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm font-bold text-neutral-900">
                    Manufacturing Facility
                  </div>
                  <div className="mt-1 text-xs text-neutral-600">
                    Controlled processing • Batch discipline
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Block 2: Image + Content (AboutImg2) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="grid items-center gap-6 lg:grid-cols-12"
          >
            {/* image (left on desktop) */}
            <div className="lg:col-span-5 lg:order-1">
              <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-300/30">
                <div className="h-[220px] sm:h-[320px] lg:h-[400px] overflow-hidden">
                  <SmartImage
                    src={AboutImg2}
                    alt="SSGT Group industrial operations"
                    motionProps={{
                      initial: reduceMotion ? false : { scale: 1.08, rotate: 0.4 },
                      whileInView: reduceMotion ? undefined : { scale: 1, rotate: 0 },
                      viewport: { once: true },
                      transition: { duration: 1.1, ease: "easeOut" },
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm font-bold text-neutral-900">
                    Operations & Dispatch
                  </div>
                  <div className="mt-1 text-xs text-neutral-600">
                    In-house logistics • Reliable delivery
                  </div>
                </div>
              </div>
            </div>

            {/* content */}
            <div className="lg:col-span-7 lg:order-2">
              <div className="grid gap-5 md:grid-cols-2">
                <InfoCard icon={ShieldCheck} title="Products">
                  Boron-based and boric-acid-based formulations designed for
                  consistent lining life, thermal stability, and reliable
                  performance in demanding operations.
                </InfoCard>

                <InfoCard icon={Target} title="Quality">
                  Controlled raw material selection, standardized processing, and{" "}
                  <span className="font-semibold text-neutral-900">
                    batch-level verification
                  </span>{" "}
                  for repeatable behavior across large-volume supplies.
                </InfoCard>
              </div>

              <div className="mt-5 rounded-3xl border border-neutral-200 bg-white/95 p-7 shadow-xl shadow-neutral-200/40 backdrop-blur-sm">
                <div className="text-base font-black text-neutral-900">
                  Work with us
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-700 md:text-base">
                  SSGT Group supplies silica ramming mass to more than{" "}
                  <span className="font-semibold text-neutral-900">
                    40 steel plants
                  </span>{" "}
                  across Central and Eastern India—focused on one product category
                  with strong execution and logistics control.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <NavLink
                    to="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-500/30"
                  >
                    Contact Us
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </NavLink>

                  <NavLink
                    to="/products"
                    className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 bg-white px-7 py-4 text-sm font-semibold text-neutral-900 shadow-lg shadow-neutral-200/30"
                  >
                    View Products
                  </NavLink>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* highlights */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="mb-8 text-center text-2xl font-black text-neutral-900 md:text-3xl">
            Why{" "}
            <span className="bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent">
              SSGT Group
            </span>
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.title}
                  className="rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-lg shadow-neutral-200/30 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 text-orange-700 ring-1 ring-orange-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-neutral-900">
                        {h.title}
                      </div>
                      <div className="mt-2 text-sm leading-relaxed text-neutral-600">
                        {h.desc}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;