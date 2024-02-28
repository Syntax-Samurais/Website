/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        custom: "340px",
      },
      fontSize: {
        "2xxl": "2.25rem",
      },
      colors: {
        customGray: "#2e2f2e",
        customDarkGray: "#191a19",
        customBlue: "#1e2f44",
        customLightBlue: "#22d3ee",
        customLightDarkBlue: "#019fc2",
        PrimaryGrey: "#718199",
        SecondaryGrey: "#191a19",
        PrimaryBlue: "#294D77",
        SecondaryBlue: "#1861A5",
        Utility: "#BFAD1D",
      },

      color: {
        customHeaderBlue: "#294d77",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
