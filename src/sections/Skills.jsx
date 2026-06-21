import React from "react";
import { motion } from "motion/react";

const skills = [
  "Python", "React.js", "JavaScript", "FastAPI", "SQL", "MongoDB",
  "LangChain", "OpenAI API", "RAG", "Docker", "Git", "AWS SageMaker",
  "PyTorch", "Scikit-learn", "HuggingFace", "Pandas", "NumPy",
];

const Skills = () => {
  const loop = [...skills, ...skills];
  return (
    <section id="skills" className="relative z-10 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-6"
      >
        <p className="font-mono-jb text-blue-500 text-xs tracking-[0.3em] uppercase mb-3">// Tech Stack</p>
        <h2 className="oswald-regular text-4xl md:text-5xl text-white">
          Skills &amp; <span className="text-blue-500">Tools</span>
        </h2>
      </motion.div>

      <div className="marquee-pause relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
          style={{ background: "linear-gradient(to right, #000, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
          style={{ background: "linear-gradient(to left, #000, transparent)" }}
        />
        <div className="flex gap-5 animate-marquee w-max">
          {loop.map((s, i) => (
            <div
              key={i}
              className="glass glass-hover px-6 py-4 rounded-xl whitespace-nowrap oswald-regular text-white tracking-wide transition-all duration-300"
            >
              <span className="text-blue-500 mr-2">{"<"}</span>
              {s}
              <span className="text-blue-500 ml-2">{"/>"}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;