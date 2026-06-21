import React from "react";

const Tooltip = () => {
  return (
    <section className="flex justify-center items-center">
      <button
        className="
        relative group
        flex items-center justify-center
        w-10 h-10
        rounded-xl
        bg-white/5 backdrop-blur-md
        border border-white/10
        text-gray-300
        hover:text-white
        hover:bg-white/10
        hover:cursor-pointer
        hover:-translate-y-1
        transition-all duration-300
        shadow-lg drop-shadow-2xl drop-shadow-blue-600
      "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="
          w-4 h-4
          transition-all duration-300
          group-hover:scale-110
          "
        >
          <path d="M19.536 9.146c-1.373 0-2.133 1.014-2.294 2.116h4.608c-.125-1.05-.867-2.115-2.314-2.115m-2.26 3.617c.235 1.156 1.193 1.97 2.532 1.97.725 0 1.77-.27 2.384-.914l1.175 1.35c-1.064 1.11-2.653 1.426-3.74 1.426-2.64 0-4.697-1.906-4.697-4.606 0-2.535 1.894-4.62 4.57-4.62 2.585 0 4.5 1.98 4.5 4.604v.766h-6.723v.023zm-6.487 3.83v-5.69c0-.976-.435-1.536-1.338-1.536-.814 0-1.355.585-1.717 1.007v6.24h-2.35v-5.7c0-.976-.415-1.532-1.318-1.532-.813 0-1.375.586-1.717 1.006v6.24H0V7.505h2.35v1.15c.4-.463 1.302-1.26 2.71-1.26 1.247 0 2.096.526 2.477 1.59.524-.761 1.5-1.59 2.91-1.59 1.7 0 2.69 1.01 2.69 2.963v6.24h-2.353l.005-.007z" />
        </svg>

        <span
          className="
          absolute bottom-full mb-2
          px-2.5 py-1
          text-[11px]
          rounded-md
          bg-black/80
          text-white
          whitespace-nowrap
          opacity-0
          translate-y-2
          pointer-events-none
          group-hover:opacity-100
          group-hover:translate-y-0
          transition-all duration-300 ease-out
        "
        >
          About
        </span>
      </button>
    </section>
  );
};

export default Tooltip;