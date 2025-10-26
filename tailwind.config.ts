import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
    "./mdx-components.tsx"
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0F",
        foreground: "#EAEAEA",
        primary: "#6C63FF",
        accent: "#00B7FF",
        muted: "#1A1A24"
      },
      fontFamily: {
        sans: ['var(--font-sans)', '"Cabin Condensed"', "sans-serif"]
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      },
      boxShadow: {
        glow: "0 0 60px rgba(108, 99, 255, 0.35)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.12)"
      }
    }
  },
  plugins: [animate]
};

export default config;
