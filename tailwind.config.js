/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    // "rail" is where the identity frame becomes a fixed left rail.
    screens: {
      sm: "480px",
      md: "768px",
      rail: "1100px",
      wide: "1440px",
    },
    extend: {
      colors: {
        bg: "#0A0A0A",
        raised: "#141414",
        ink: "#F5F5F5",
        dim: "#A6A6A6",
        rule: "#303030",
        signal: "#FF2D20",
      },
      fontFamily: {
        sans: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
