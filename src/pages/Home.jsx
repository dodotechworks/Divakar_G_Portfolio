import React from "react";
import { motion } from "motion/react";
import HomeButton from "@/components/HomeButton";
import ContactButton from "@/components/ContactButton";
import MeButton from "@/components/MeButton";
import ProjectButton from "@/components/ProjectButton";
import Linkedin from "@/components/Linkedin";
import WhatsApp from "@/components/Whatsapp";
import GitHubButton from "@/components/GithubButton";
import Resume from "@/components/Resume";
import photo from "@/assets/photo.png";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Contact from "@/sections/Contact";

const scrollTo = (id) => {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Home = () => {
  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      {/* Cyber grid background */}
      <div className="fixed inset-0 cyber-grid opacity-60 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(0,140,255,0.18), transparent 55%), radial-gradient(ellipse at bottom, rgba(0,140,255,0.12), transparent 60%)",
        }}
      />

      {/* Top Left Logo */}
      <div className="fixed top-0 left-0 p-6 md:p-10 z-50">
        <h1 className="oswald-bold text-white text-2xl tracking-widest border border-white/20 px-3 py-1 rounded-lg backdrop-blur-md bg-white/5 shadow-lg shadow-blue-600/30">
          D
        </h1>
      </div>

      {/* Top Right Social */}
      <div className="fixed top-0 right-0 p-6 md:p-10 z-50">
        <div className="flex gap-3 md:gap-4">
          <a href="https://linkedin.com/in/divakargwork/" target="_blank" rel="noreferrer"><Linkedin /></a>
          <a href="https://wa.me/918608659958" target="_blank" rel="noreferrer"><WhatsApp /></a>
          <a href="https://github.com/Divakar-G-Github" target="_blank" rel="noreferrer"><GitHubButton /></a>
        </div>
      </div>

      {/* Bottom Left Resume */}
      <div className="fixed bottom-0 left-0 p-6 md:p-10 z-50">
        <a href="https://drive.google.com/file/d/1V4s4ZedJUee59CtRMKPja8qYDqfesiYG/view?usp=sharing">
          <Resume />
        </a>
      </div>

      {/* Bottom Right Nav */}
      <div className="fixed bottom-0 right-0 p-6 md:p-10 z-50">
        <div className="space-y-4">
          <div onClick={() => scrollTo("home")}><HomeButton /></div>
          <div onClick={() => scrollTo("about")}><MeButton /></div>
          <div onClick={() => scrollTo("projects")}><ProjectButton /></div>
          <div onClick={() => scrollTo("contact")}><ContactButton /></div>
        </div>
      </div>

      {/* HERO */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-center px-8 md:px-24 pt-24 md:pt-0 gap-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 space-y-5 text-center md:text-left"
        >
          <p className="font-mono-jb text-blue-500 text-xs tracking-[0.3em] uppercase">
            // AI Engineer
          </p>
          <h1 className="oswald-regular text-white text-4xl md:text-6xl leading-tight">
            Building <span className="text-blue-500 animate-pulse">Intelligent</span>
            <br /> Experiences with
            <br />
            <span className="oswald-bold bg-gradient-to-r from-gray-300 via-gray-500 to-gray-300 bg-clip-text text-transparent">
              AI &amp; Code
            </span>
          </h1>

          <h2 className="oswald-thin text-white text-2xl md:text-3xl">
            Hi, I'm{" "}
            <span className="oswald-regular text-blue-500" style={{ textShadow: "0 0 14px #008cff" }}>
              Divakar G
            </span>
          </h2>

          <p className="text-gray-400 oswald-thin max-w-xl mx-auto md:mx-0 text-base md:text-lg leading-relaxed">
            AI Engineer passionate about building intelligent applications using
            Generative AI, Machine Learning, RAG systems, and Full Stack Development.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo("projects")}
            className="oswald-regular tracking-wider text-white border border-blue-500/60 px-7 py-3 rounded-full bg-blue-600/10 hover:bg-blue-600 transition-all duration-300"
            style={{ boxShadow: "0 0 20px rgba(0,140,255,0.35)" }}
          >
            VIEW PROJECTS
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center relative"
        >
          <div
            className="absolute inset-0 m-auto w-72 h-72 md:w-[420px] md:h-[420px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(0,140,255,0.35), transparent 70%)" }}
          />
          <motion.img
            src={photo}
            alt="Divakar G"
            width={1024}
            height={1024}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-64 sm:w-80 md:w-[440px] lg:w-[720px] object-contain drop-shadow-lg drop-shadow-blue-600/20"
          />
        </motion.div>
      </section>

      <About />
      <Skills />
      <Projects />
      <Contact />

      <footer className="relative z-10 text-center py-8 text-gray-500 text-sm oswald-thin border-t border-white/5">
        © {new Date().getFullYear()} Divakar G — Built with React, Tailwind &amp; Motion.
      </footer>
    </main>
  );
};

export default Home;