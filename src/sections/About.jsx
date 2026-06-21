import React from "react";
import { motion } from "motion/react";

const timeline = [
  {
    date: "2021 — 2025",
    title: "B.Tech — Artificial Intelligence & Data Science",
    org: "Dhanalakshmi College of Engineering",
    meta: "CGPA: 7.58",
  },
  {
    date: "Nov 2024 — Dec 2024",
    title: "Data Analyst Intern",
    org: "Cognitive Value Tech",
    meta: "Internship",
  },
  {
    date: "Jan 2025 — Feb 2026",
    title: "AI/ML Developer",
    org: "Cognitive Value Tech",
    meta: "Full-time",
  },
];

const About = () => {
  return (
    <section id="about" className="relative z-10 min-h-screen py-24 px-6 md:px-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center mb-16"
      >
        <p className="font-mono-jb text-blue-500 text-xs tracking-[0.3em] uppercase mb-3">// About</p>
        <h2 className="oswald-regular text-4xl md:text-5xl text-white">
          My <span className="text-blue-500">Journey</span>
        </h2>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Glowing vertical line */}
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #008cff, #008cff, transparent)",
            boxShadow: "0 0 20px #008cff, 0 0 40px rgba(0,140,255,0.4)",
          }}
        />

        {timeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative mb-12 md:mb-16 md:w-1/2 ${
              i % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"
            } pl-12 md:pl-0`}
          >
            {/* Dot */}
            <div
              className="absolute left-4 md:left-auto top-2 w-4 h-4 rounded-full bg-blue-500 -translate-x-1/2 md:translate-x-0"
              style={{
                boxShadow: "0 0 15px #008cff, 0 0 30px #008cff",
                ...(i % 2 === 0
                  ? { right: "-8px", left: "auto" }
                  : { left: "-8px" }),
              }}
            />
            <div className="glass glass-hover rounded-2xl p-6 transition-all duration-300">
              <p className="font-mono-jb text-blue-400 text-xs tracking-wider mb-2">{item.date}</p>
              <h3 className="oswald-regular text-xl text-white mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.org}</p>
              <p className="text-gray-500 text-xs mt-2">{item.meta}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;