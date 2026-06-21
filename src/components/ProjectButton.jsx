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
        cursor-pointer
        hover:text-white
        hover:bg-white/10
        hover:-translate-y-1
        transition-all duration-300
        shadow-lg drop-shadow-2xl drop-shadow-orange-600
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
          <path d="M17 5V3H7v2H1v16h22V5zM8 4h8v1H8zm14 16H2V10h20zm0-11H2V6h20z" />
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
          Projects
        </span>
      </button>
    </section>
  );
};

export default Tooltip;