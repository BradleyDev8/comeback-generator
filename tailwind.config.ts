import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ["var(--font-bricolage)", "sans-serif"],
        poppins: ["var(--font-poppins)", "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pur: "#804B71",
        neon: "#00f2ff",
      },
    },
  },
  plugins: [],
} satisfies Config;
