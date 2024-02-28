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
