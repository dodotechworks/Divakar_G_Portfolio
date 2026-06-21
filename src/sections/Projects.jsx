import React from "react";
import { motion } from "motion/react";

const projects = [
  {
    title: "RAG-Based Document Chatbot",
    description:
      "Built a production RAG pipeline using LangChain, ChromaDB, OpenAI Embeddings, FastAPI, and Docker for intelligent document Q&A.",
    tech: ["LangChain", "ChromaDB", "OpenAI", "FastAPI", "Docker"],
    github: "https://github.com/Divakar-G-Github/rag-chatbot",
    demo: "https://rag-chatbot-etvz9psnhcyashujmrusnf.streamlit.app/",
  },
  {
    title: "Wireless Sensor Network Attack Prediction",
    description:
      "Built a machine learning model to detect network attacks using Python, Scikit-learn, Pandas, and NumPy with high precision.",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    github: "https://github.com/Divakar-G-Github/wsn-web-app",
    demo: "https://divakar-wsn-web-app.streamlit.app/",
  },
];

const ProjectCard = ({ p, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay: i * 0.1 }}
    whileHover={{ y: -6 }}
    className="glass glass-hover rounded-2xl p-7 flex flex-col transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <p className="font-mono-jb text-blue-500 text-xs tracking-wider">
        0{i + 1} / PROJECT
      </p>
      <div className="h-2 w-2 rounded-full bg-blue-500" style={{ boxShadow: "0 0 12px #008cff" }} />
    </div>
    <h3 className="oswald-regular text-2xl text-white mb-3">{p.title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">{p.description}</p>
    <div className="flex flex-wrap gap-2 mb-5">
      {p.tech.map((t) => (
        <span key={t} className="text-xs px-3 py-1 rounded-full border border-blue-500/30 text-blue-300 bg-blue-500/5 font-mono-jb">
          {t}
        </span>
      ))}
    </div>
    <div className="flex gap-3">
      <a
        href={p.github}
        target="_blank"
        rel="noreferrer"
        className="flex-1 text-center text-sm oswald-regular tracking-wider text-white/80 border border-white/30 rounded-lg py-2 hover:border-white hover:text-white transition"
      >
        GITHUB
      </a>
      <a
        href={p.demo}
        target="_blank"
        rel="noreferrer"
        className="flex-1 text-center text-sm oswald-regular tracking-wider text-white bg-blue-600/20 border border-blue-500 rounded-lg py-2 hover:bg-blue-600 transition"
        style={{ boxShadow: "0 0 15px rgba(0,140,255,0.25)" }}
      >
        LIVE DEMO
      </a>
    </div>
  </motion.div>
);

const Projects = () => {
  return (
    <section id="projects" className="relative z-10 py-24 px-6 md:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="font-mono-jb text-blue-500 text-xs tracking-[0.3em] uppercase mb-3">// Work</p>
        <h2 className="oswald-regular text-4xl md:text-5xl text-white">
          Featured <span className="text-blue-500">Projects</span>
        </h2>
      </motion.div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-7">
        {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
      </div>
    </section>
  );
};

export default Projects;