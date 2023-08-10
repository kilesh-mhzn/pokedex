/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        game: "'Press Start 2P', cursive",
      },
      colors: {
        brown: {
          400: "#a68966",
        },
        white: {
          100: "#fff",
          400: "#e2e8f0",
        },
        black: {
          400: "#898989",
        },
      },
    },
  },
  safelist: [
    {
      pattern:
        /bg-(red|green|blue|purple|brown|pink|yellow|gray|white|black)-(400)/,
    },
    {
      pattern:
        /shadow-(red|green|blue|purple|brown|pink|yellow|gray|white|black)-(400)/,
    },
  ],
  plugins: [],
};
