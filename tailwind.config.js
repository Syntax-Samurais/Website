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
        mountains: "url('/images/mountains.jpeg')",
        mountains2: "url('/images/mountains2.jpeg')",
        gradient_native:
          "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%)",
        gradient: "url('/images/gradient.jpg')",
        logo1: "url('/images/logo1.png')",
        propoganda: "url('/images/propaganda.png",
      },
    },
  },
  plugins: [],
};
