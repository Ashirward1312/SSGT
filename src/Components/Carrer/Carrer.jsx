import React, { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  User,
  MapPin,
  Phone,
  Mail,
  FileUp,
  Send,
  CheckCircle2,
  XCircle,
  Upload,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";

const Career = () => {
  const reduceMotion = useReducedMotion();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [dragActive, setDragActive] = useState(false);

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

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.resume) newErrors.resume = "Please upload your resume";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (file) => {
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = 5 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          resume: "Only PDF, DOC, DOCX files are allowed",
        }));
        return;
      }
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          resume: "File size should be less than 5MB",
        }));
        return;
      }

      setForm((prev) => ({ ...prev, resume: file }));
      setErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setForm((prev) => ({ ...prev, resume: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("location", form.location);
      if (form.resume) formData.append("resume", form.resume);

      const response = await fetch(
        "http://localhost/career-api/career-api/career.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(result?.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError("Network error. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const benefits = [
    "Growth-oriented work environment",
    "Hands-on industry experience",
    "Competitive compensation",
    "Collaborative team culture",
  ];

  // ── Success Screen ──
  if (submitted) {
    return (
      <main className="bg-neutral-950">
        <section
          // ✅ GAP FIX like About/Hero
          className="relative -mt-24 scroll-mt-24 overflow-hidden pt-24 pb-16 lg:pb-24"
        >
          <div className="relative flex min-h-[calc(100svh-6rem)] items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_50%_40%,rgba(249,115,22,0.15),transparent_55%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-950" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative mx-auto max-w-lg px-6 text-center"
            >
              <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-green-500/15 ring-1 ring-green-500/30">
                <CheckCircle2 className="h-10 w-10 text-green-400" />
              </div>

              <h2 className="text-3xl font-black text-white md:text-4xl">
                Application{" "}
                <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Submitted!
                </span>
              </h2>

              <p className="mt-4 text-base leading-relaxed text-neutral-300">
                Thank you for your interest in joining our team. We've received
                your application along with your resume. Our HR team will reach
                out to you if your profile matches our requirements.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    location: "",
                    phone: "",
                    email: "",
                    resume: null,
                  });
                  setSubmitError("");
                }}
                className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:brightness-110"
              >
                Submit Another Application
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-neutral-950">
      <section
        // ✅ GAP FIX like About/Hero
        className="relative -mt-24 scroll-mt-24 overflow-hidden pt-24 pb-16 lg:pb-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_15%_10%,rgba(249,115,22,0.18),transparent_55%),radial-gradient(900px_circle_at_90%_85%,rgba(249,115,22,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-950" />

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
              Join Our Team
            </motion.div>

            <motion.h1
              variants={reduceMotion ? undefined : item}
              className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl lg:text-5xl"
            >
              Build Your{" "}
              <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
                Career
              </span>{" "}
              With Us
            </motion.h1>

            <motion.p
              variants={reduceMotion ? undefined : item}
              className="mt-4 text-base leading-relaxed text-neutral-300 md:text-lg"
            >
              We're looking for dedicated professionals who share our commitment
              to quality and excellence. Submit your application below and take
              the first step toward a rewarding career.
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            variants={reduceMotion ? undefined : container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-5"
          >
            {/* Left Panel */}
            <motion.div
              variants={reduceMotion ? undefined : cardIn}
              className="flex flex-col gap-6 lg:col-span-2"
            >
              {/* Why Join */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:p-8">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/25">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-extrabold text-white">
                      Why Join Us?
                    </h2>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                    Be part of a team that's shaping the future of refractory
                    manufacturing in India. We value expertise, dedication, and a
                    drive for continuous improvement.
                  </p>
                  <ul className="mt-5 space-y-3">
                    {benefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-500/15 ring-1 ring-orange-500/25">
                          <CheckCircle2 className="h-3.5 w-3.5 text-orange-400" />
                        </div>
                        <span className="text-sm text-neutral-200">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tips */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:p-8">
                <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/25">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-extrabold text-white">
                      Application Tips
                    </h2>
                  </div>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-300">
                    <p>
                      <span className="font-semibold text-orange-300">
                        Resume Format:
                      </span>{" "}
                      Upload in PDF, DOC, or DOCX format (max 5MB).
                    </p>
                    <p>
                      <span className="font-semibold text-orange-300">
                        Details:
                      </span>{" "}
                      Ensure your contact information is accurate so we can reach
                      you.
                    </p>
                    <p>
                      <span className="font-semibold text-orange-300">
                        Response Time:
                      </span>{" "}
                      We typically review applications within 5–7 business days.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Panel — Form */}
            <motion.div
              variants={reduceMotion ? undefined : cardIn}
              className="lg:col-span-3"
            >
              <form
                onSubmit={handleSubmit}
                noValidate
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur lg:p-8"
              >
                <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-orange-500/[0.08] blur-3xl" />
                <div className="absolute -left-16 -bottom-16 h-52 w-52 rounded-full bg-orange-500/5 blur-3xl" />

                <div className="relative space-y-5">
                  <div className="mb-6">
                    <h2 className="text-2xl font-extrabold text-white">
                      Apply Now
                    </h2>
                    <p className="mt-1.5 text-sm text-neutral-400">
                      Fill in your details and upload your resume to get started.
                    </p>
                  </div>

                  {/* Server Error */}
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
                    >
                      <XCircle className="h-5 w-5 shrink-0 text-red-400" />
                      <p className="text-sm text-red-300">{submitError}</p>
                    </motion.div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-200"
                    >
                      <User className="h-4 w-4 text-orange-400" />
                      Full Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none backdrop-blur transition-all duration-200 focus:ring-2 ${
                        errors.name
                          ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                          : "border-white/10 focus:border-orange-500/50 focus:ring-orange-500/20"
                      }`}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label
                      htmlFor="location"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-200"
                    >
                      <MapPin className="h-4 w-4 text-orange-400" />
                      Location <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="City, State"
                      className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none backdrop-blur transition-all duration-200 focus:ring-2 ${
                        errors.location
                          ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                          : "border-white/10 focus:border-orange-500/50 focus:ring-orange-500/20"
                      }`}
                    />
                    {errors.location && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        {errors.location}
                      </motion.p>
                    )}
                  </div>

                  {/* Phone & Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-200"
                      >
                        <Phone className="h-4 w-4 text-orange-400" />
                        Phone Number <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none backdrop-blur transition-all duration-200 focus:ring-2 ${
                          errors.phone
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                            : "border-white/10 focus:border-orange-500/50 focus:ring-orange-500/20"
                        }`}
                      />
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          {errors.phone}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-200"
                      >
                        <Mail className="h-4 w-4 text-orange-400" />
                        Email <span className="text-orange-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none backdrop-blur transition-all duration-200 focus:ring-2 ${
                          errors.email
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                            : "border-white/10 focus:border-orange-500/50 focus:ring-orange-500/20"
                        }`}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-200">
                      <FileUp className="h-4 w-4 text-orange-400" />
                      Upload Resume <span className="text-orange-500">*</span>
                    </label>

                    {!form.resume ? (
                      <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`group cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
                          dragActive
                            ? "border-orange-500/60 bg-orange-500/10"
                            : errors.resume
                            ? "border-red-500/40 bg-red-500/5 hover:border-red-500/60"
                            : "border-white/15 bg-white/[0.02] hover:border-orange-500/40 hover:bg-white/5"
                        }`}
                      >
                        <div
                          className={`mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full transition-colors ${
                            dragActive
                              ? "bg-orange-500/20 text-orange-300"
                              : "bg-white/10 text-neutral-400 group-hover:bg-orange-500/15 group-hover:text-orange-300"
                          }`}
                        >
                          <Upload className="h-5 w-5" />
                        </div>

                        <p className="text-sm font-semibold text-neutral-300">
                          {dragActive ? (
                            <span className="text-orange-300">
                              Drop your file here
                            </span>
                          ) : (
                            <>
                              Drag & drop your resume or{" "}
                              <span className="text-orange-400 underline decoration-orange-400/30 underline-offset-2">
                                browse
                              </span>
                            </>
                          )}
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                          PDF, DOC, DOCX — Max 5MB
                        </p>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(e.target.files?.[0])}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3"
                      >
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-green-500/15 text-green-400">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">
                            {form.resume.name}
                          </p>
                          <p className="text-xs text-neutral-400">
                            {formatFileSize(form.resume.size)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={removeFile}
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-neutral-400 transition hover:bg-white/10 hover:text-red-400"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </motion.div>
                    )}

                    {errors.resume && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        {errors.resume}
                      </motion.p>
                    )}
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="opacity-25"
                          />
                          <path
                            d="M4 12a8 8 0 018-8"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="opacity-75"
                          />
                        </svg>
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit Application
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-neutral-500">
                    By submitting, you agree that your information will be used for recruitment purposes only.
                  </p>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Career;