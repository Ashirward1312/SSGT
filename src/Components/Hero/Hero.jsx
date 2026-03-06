import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Video from "../Img/v2.mp4";

const HEADER_H = 96; // header h-24 = 96px (agar header height change ho to update)

const Hero = () => {
  const containerRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  // ✅ Mobile 100vh fix (address bar) => bottom gap fix
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);
    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  /* ================= SCROLL EFFECT ================= */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.98]);

  /* ================= PARTICLES ================= */
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
      { threshold: 0.25 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ heights (mobile safe)
  const heroMinH = "calc(var(--vh, 1vh) * 100)";
  const contentMinH = `calc(${heroMinH} - ${HEADER_H}px)`;

  // ✅ IMPORTANT: only ONE style object for motion.div (no duplicate style prop)
  const contentMotionStyle = reduceMotion
    ? { minHeight: contentMinH }
    : { y, opacity, scale, minHeight: contentMinH };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-neutral-950 -mt-24 pt-24"
      style={{ minHeight: heroMinH }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-950 to-orange-950/30" />

      {/* Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-orange-500/18 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-[24rem] w-[24rem] rounded-full bg-orange-400/10 blur-3xl" />
      </div>

      {/* Particles (mobile pe hide for clean look) */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-orange-500/18"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -60, 0], opacity: [0.15, 0.55, 0.15] }
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
        style={contentMotionStyle}
        className="relative z-10 flex items-start"
      >
        {/*
          ✅ MOVE CONTENT UP/DOWN (mobile)
          -translate-y-6 => upar
          -translate-y-10 => aur upar
        */}
        <div className="w-full -translate-y-12 sm:translate-y-0">
          {/*
            ✅ Top padding control:
            pt-0 => more up
            pt-8 => more down
          */}
          <div className="w-full px-4 sm:px-6 lg:px-16 pt-0 sm:pt-6 lg:pt-8 pb-10 sm:pb-12 lg:pb-16">
            <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-2">
              {/* LEFT TEXT */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.75 }}
                className="text-center lg:text-left overflow-visible"
              >
                <div className="mx-auto lg:mx-0 mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-[11px] sm:text-sm text-orange-300 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                  Trusted by Steel Industry Leaders Worldwide
                </div>

                {/* ✅ “G cut” fix: leading + pb-1 */}
                <h1 className="text-white tracking-tight leading-[1.12] overflow-visible">
                  <span className="block text-3xl sm:text-4xl lg:text-7xl font-black pb-1">
                    SSGT Group
                  </span>

                  <span className="mt-3 block text-lg sm:text-xl font-semibold text-white/70 lg:text-2xl">
                    Central India's Largest Manufacturer
                  </span>

                  <span className="mt-2 block text-xl sm:text-2xl font-extrabold lg:text-5xl bg-gradient-to-r from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
                    of Silica Ramming Mass
                  </span>
                </h1>

                <p className="mt-5 mx-auto lg:mx-0 max-w-xl text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Delivering consistent quality, high thermal performance, and
                  reliable supply powered by industry-first manufacturing
                  standards.
                </p>
              </motion.div>

              {/* RIGHT VIDEO */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.85 }}
                className="mx-auto w-full max-w-lg sm:max-w-xl lg:max-w-none"
              >
                <div className="relative overflow-hidden rounded-3xl border border-orange-500/25 bg-neutral-900 shadow-2xl shadow-black/40">
                  {isVideoVisible && (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="aspect-video lg:aspect-[16/10] w-full object-cover"
                      onLoadedData={() => setIsVideoLoaded(true)}
                    >
                      <source src={Video} type="video/mp4" />
                    </video>
                  )}

                  {isVideoVisible && !isVideoLoaded && (
                    <div className="absolute inset-0 grid place-items-center bg-black/70 backdrop-blur-sm">
                      <div className="h-10 w-10 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-5">
                    <div className="text-xs sm:text-sm text-neutral-200">
                      Premium Production • Reliable Supply
                    </div>
                    <div className="mt-1 text-base sm:text-lg font-semibold text-white">
                      Silica Ramming Mass for Induction Furnaces
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;