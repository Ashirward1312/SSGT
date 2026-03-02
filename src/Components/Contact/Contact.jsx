// src/components/ContactSection.jsx
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Building2,
  User2,
  MessageSquare,
  Linkedin,
  Instagram,
  MessageCircle,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

const ContactSection = () => {
  const reduceMotion = useReducedMotion();

  const EMAIL = "info@ssgtgroup.com";
  const PHONES = ["+91 8435317776", "+91 8349177761"];
  const WHATSAPP_NUMBERS = ["918435317776", "918349177761"];
  const defaultWhatsappText =
    "Hello SSGT Group, I would like to enquire about silica ramming mass for induction furnace applications.";

  const SOCIAL = {
    linkedin: "https://www.linkedin.com/company/ssgt-group/",
    instagram: "https://www.instagram.com/ssgtgroup?igsh=MWozZ3lhbWJrbHV5ag==",
  };

  const waLink = (number) =>
    `https://wa.me/${number}?text=${encodeURIComponent(defaultWhatsappText)}`;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.message.trim()) next.message = "Message is required.";
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    try {
      setStatus("sending");
      await new Promise((r) => setTimeout(r, 900));
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-orange-500/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-orange-500/20";

  const inputWithIconClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-orange-500/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-orange-500/20";

  return (
    <section id="contact" className="relative overflow-hidden bg-neutral-950 py-14 lg:py-20">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-orange-500/[0.06] blur-[140px]" />
        <div className="absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-orange-600/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        {/* ── Header ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>
            Get In Touch
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl">
            Contact{" "}
            <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
              SSGT Group
            </span>
          </h2>
          <p className="mt-3 text-neutral-400">
            Share your requirement and our team will connect with you promptly.
          </p>
        </motion.div>

        {/* ── Contact Info Cards (Top Row) ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Email */}
          <a
            href={`mailto:${EMAIL}`}
            className="group flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition hover:border-orange-500/30 hover:bg-white/[0.06]"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-500/15 text-orange-400">
              <Mail className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Email
              </div>
              <div className="truncate text-sm font-medium text-white">{EMAIL}</div>
            </div>
          </a>

          {/* Phone */}
          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition hover:border-orange-500/30 hover:bg-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-500/15 text-orange-400">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Phone
                </div>
                {PHONES.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="block text-sm font-medium text-white hover:text-orange-400"
                  >
                    {p}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition hover:border-orange-500/30 hover:bg-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-500/15 text-orange-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Location
                </div>
                <div className="text-sm font-medium text-white">Raipur, Chhattisgarh</div>
                <div className="text-xs text-neutral-500">Dharsiwa • Raigarh</div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition hover:border-orange-500/30 hover:bg-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-500/15 text-orange-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Working Hours
                </div>
                <div className="text-sm font-medium text-white">Mon – Sat</div>
                <div className="text-xs text-neutral-500">9:00 AM – 6:00 PM</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Main: Form + Side Panel ── */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Form (wider) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-sm lg:col-span-3 lg:p-8"
          >
            <h3 className="text-xl font-bold text-white">Send an Enquiry</h3>
            <p className="mt-1 text-sm text-neutral-500">
              Fill in the details below and we'll get back to you.
            </p>

            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Name <span className="text-orange-400">*</span>
                  </label>
                  <div className="relative">
                    <User2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      className={inputWithIconClass}
                      placeholder="Your name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
                      <AlertCircle className="h-3 w-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Company
                  </label>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
                    <input
                      name="company"
                      value={form.company}
                      onChange={onChange}
                      className={inputWithIconClass}
                      placeholder="Company name"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Email <span className="text-orange-400">*</span>
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className={inputClass}
                    placeholder="name@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
                      <AlertCircle className="h-3 w-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Phone <span className="text-orange-400">*</span>
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className={inputClass}
                    placeholder="+91 ..."
                  />
                  {errors.phone && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
                      <AlertCircle className="h-3 w-3" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Subject
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  className={inputClass}
                  placeholder="Quotation / Technical query / Supply"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Message <span className="text-orange-400">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="pointer-events-none absolute left-3.5 top-4 h-4 w-4 text-neutral-600" />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-orange-500/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-orange-500/20"
                    placeholder="Furnace capacity, monthly consumption, delivery location..."
                  />
                </div>
                {errors.message && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle className="h-3 w-3" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:shadow-orange-500/30 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>

                {status === "sent" && (
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> Sent successfully!
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-red-400">
                    <AlertCircle className="h-4 w-4" /> Something went wrong.
                  </p>
                )}
              </div>

              <p className="text-[11px] text-neutral-600">
                By submitting, you agree to be contacted by SSGT Group regarding your enquiry.
              </p>
            </form>
          </motion.div>

          {/* Side Panel */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col gap-4 lg:col-span-2"
          >
            {/* WhatsApp */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">WhatsApp Support</div>
                  <div className="text-xs text-neutral-400">
                    Quick response for enquiries
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {WHATSAPP_NUMBERS.map((n, i) => (
                  <a
                    key={n}
                    href={waLink(n)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-600 active:scale-[0.97]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Chat {i + 1}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>

            {/* Address Detail */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <div className="text-sm font-bold text-white">Business Address</div>

              <div className="mt-3 space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    <Building2 className="h-3 w-3" />
                    Manufacturing Operations
                  </div>
                  <div className="mt-1 space-y-0.5 text-sm text-neutral-400">
                    <div>Dharsiwa, Raipur, Chhattisgarh</div>
                    <div>Gerwani, Raigarh, Chhattisgarh</div>
                  </div>
                </div>

                <div className="h-px bg-white/[0.06]" />

                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    <Building2 className="h-3 w-3" />
                    Corporate Office
                  </div>
                  <div className="mt-1 text-sm text-neutral-400">
                    Raipur, Chhattisgarh
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <div className="text-sm font-bold text-white">Follow Us</div>
              <div className="mt-3 grid gap-2">
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-medium text-neutral-300 transition hover:border-orange-500/20 hover:bg-white/[0.06] hover:text-white"
                >
                  <span className="flex items-center gap-2.5">
                    <Linkedin className="h-4 w-4 text-orange-400" />
                    LinkedIn
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-neutral-600" />
                </a>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-medium text-neutral-300 transition hover:border-orange-500/20 hover:bg-white/[0.06] hover:text-white"
                >
                  <span className="flex items-center gap-2.5">
                    <Instagram className="h-4 w-4 text-orange-400" />
                    Instagram
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-neutral-600" />
                </a>
              </div>
            </div>

            {/* Quick Note */}
            <div className="rounded-2xl border border-orange-500/15 bg-orange-500/[0.05] p-5">
              <div className="text-sm font-bold text-white">Quick Response</div>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                We typically respond to all enquiries within{" "}
                <span className="font-semibold text-orange-300">24 hours</span>. For
                urgent requirements, use WhatsApp for immediate assistance.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;