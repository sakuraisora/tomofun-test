import type { Config } from "tailwindcss";

const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sakura: {
          DEFAULT: "rgb(255, 183, 197)",
          light: "rgb(255, 218, 224)",
          dark: "rgb(219, 127, 142)",
        },
        cream: "rgb(255, 248, 240)",
        brown: {
          DEFAULT: "rgb(121, 85, 72)",
          light: "rgb(161, 136, 127)",
        },
      },
      maxWidth: {
        md: "568px",
      },
      maxHeight: {
        md: "568px",
      },
      boxShadow: {
        sakura:
          "0 4px 6px -1px rgba(255, 183, 197, 0.3), 0 2px 4px -1px rgba(255, 183, 197, 0.2)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
