// src/components/Hero.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Video from "../Img/v2.mp4";

const Hero = () => {
  const containerRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  /* ================= SCROLL EFFECT ================= */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.97]);

  /* ================= PARTICLES (REDUCED COUNT FOR PERFORMANCE) ================= */
  const particles = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 14 + 8,
      delay: Math.random() * 3,
    }));
  }, []);

  /* ================= INTERSECTION OBSERVER ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-neutral-950"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-950 to-orange-950/30" />

      {/* Glow Blobs */}
      <div className="absolute inset-0">
        <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-[24rem] w-[24rem] rounded-full bg-orange-400/10 blur-3xl" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-orange-500/20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -70, 0],
                    opacity: [0.2, 0.6, 0.2],
                  }
            }
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={reduceMotion ? undefined : { y, opacity, scale }}
        className="relative z-10 flex min-h-screen items-center justify-center"
      >
        <div className="w-full px-6 py-16 lg:px-16">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            
            {/* LEFT TEXT */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-sm text-orange-300 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                Trusted by Steel Industry Leaders Worldwide
              </div>

              <h1 className="text-white leading-tight">
                <span className="block text-4xl font-black lg:text-7xl">
                  SSGT Group
                </span>

                <span className="mt-3 block text-xl font-semibold text-white/70 lg:text-2xl">
                  Central India's Largest Manufacturer
                </span>

                <span className="mt-2 block text-2xl font-extrabold lg:text-5xl bg-gradient-to-r from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
                  of Silica Ramming Mass
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-neutral-300 lg:text-lg">
                Delivering consistent quality, high thermal performance, and reliable
                supply powered by industry-first manufacturing standards.
              </p>
            </motion.div>

            {/* RIGHT VIDEO */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 40 }}
              animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="relative overflow-hidden rounded-3xl border border-orange-500/25 bg-neutral-900 shadow-2xl shadow-black/40">

                {isVideoVisible && (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="aspect-[16/10] w-full object-cover"
                    onCanPlayThrough={() => setIsVideoLoaded(true)}
                  >
                    <source src={Video} type="video/mp4" />
                  </video>
                )}

                {!isVideoLoaded && (
                  <div className="absolute inset-0 grid place-items-center bg-black/70 backdrop-blur-sm">
                    <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                  <div className="text-sm text-neutral-200">
                    Premium Production • Reliable Supply
                  </div>
                  <div className="mt-1 text-lg font-semibold text-white">
                    Silica Ramming Mass for Induction Furnaces
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;