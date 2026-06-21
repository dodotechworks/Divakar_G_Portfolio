import React, { useState } from "react";
import { motion } from "motion/react";

const cards = [
  {
    label: "Email",
    value: "divakarg.work@gmail.com",
    href: "mailto:divakarg.work@gmail.com",
    icon: "M2 4h20v16H2zM2 4l10 8 10-8",
  },
  {
    label: "Phone",
    value: "+91 8608659958",
    href: "tel:+918608659958",
    icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z",
  },
  {
    label: "Location",
    value: "Chennai, India",
    href: "#",
    icon: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("https://formspree.io/f/xwvqqvwb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative z-10 py-24 px-6 md:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="font-mono-jb text-blue-500 text-xs tracking-[0.3em] uppercase mb-3">
          // Connect
        </p>

        <h2 className="oswald-regular text-4xl md:text-5xl text-white">
          Let's <span className="text-blue-500">Build</span> Together
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          {cards.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass glass-hover rounded-2xl p-5 flex items-center gap-5 transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border border-blue-500/40 bg-blue-500/10"
                style={{ boxShadow: "0 0 18px rgba(0,140,255,0.3)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3b9eff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d={c.icon} />
                </svg>
              </div>

              <div>
                <p className="font-mono-jb text-xs text-blue-400 tracking-wider uppercase">
                  {c.label}
                </p>
                <p className="oswald-regular text-white text-lg">{c.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={onSubmit}
          className="glass rounded-2xl p-7 space-y-4"
        >
          <div>
            <label className="font-mono-jb text-xs text-blue-400 tracking-wider uppercase">
              Name
            </label>
            <input
              required
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="font-mono-jb text-xs text-blue-400 tracking-wider uppercase">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="font-mono-jb text-xs text-blue-400 tracking-wider uppercase">
              Message
            </label>
            <textarea
              required
              name="message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full oswald-regular tracking-wider text-white border border-blue-500 bg-blue-600/20 hover:bg-blue-600 rounded-lg py-3 transition"
            style={{ boxShadow: "0 0 20px rgba(0,140,255,0.35)" }}
          >
            {status === "Sending..." ? "SENDING..." : "SEND MESSAGE"}
          </motion.button>

          {status && (
            <p className="text-center text-sm text-blue-400">{status}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;