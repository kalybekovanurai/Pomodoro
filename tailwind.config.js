/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    // === Background colors for whole app ===
    "bg-[#BA4949]", // Pomodoro (main background)
    "bg-[#38858A]", // Short Break (main background)
    "bg-[#397097]", // Long Break (main background)

    "text-[#BA4949]",
    "text-[#38858A]",
    "text-[#397097]",
  ],
  plugins: [],
};
