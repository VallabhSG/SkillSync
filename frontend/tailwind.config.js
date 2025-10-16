/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#3b82f6",
          700: "#2563eb",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      backgroundImage: {
        "dark-gradient":
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        "card-gradient":
          "linear-gradient(to bottom right, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))",
      },
    },
  },
  plugins: [],
};
