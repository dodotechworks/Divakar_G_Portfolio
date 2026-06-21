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
        shadow-lg drop-shadow-2xl drop-shadow-orange-600
      "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="
          w-4 h-4
          transition-all duration-300
          group-hover:scale-110
          "
        >
          <path d="M27 18.039L16 9.501 5 18.039V14.56l11-8.54 11 8.538v3.481zm-2.75-.31v8.251h-5.5v-5.5h-5.5v5.5h-5.5v-8.25L16 11.543l8.25 6.186z" />
        </svg>

        {/* Tooltip */}
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

          group-hover:opacity-100
          group-hover:translate-y-0

          transition-all duration-300 ease-out
          pointer-events-none
        "
        >
          Home
        </span>
      </button>
    </section>
  );
};

export default Tooltip;