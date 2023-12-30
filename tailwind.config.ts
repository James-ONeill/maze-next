import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brown: "#691e00",
        "brown-dark": "#4e1e10",
        orange: "#e04000",

        gold: "#c4ad79",
        silver: "#949494",
        bronze: "#b37520",
      },
      fontSize: {
        "2xs": "0.6rem",
        "6xl": "3.5rem",
      },
    },
  },
  plugins: [],
}
export default config
