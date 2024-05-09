/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      vs: "300px",
      sm: "420px",
      md: "700px",
      lg: "1200px",
      xl: "1440px",
    },

    extend: {
      colors: {
        primaryColor: "#4F32F6",
        primaryBg: "#020816",
        navBg: "#090116",
        secNav: "#AA9BFF",
        white: "#ffffff",
        announcement: "#14CDDA",
        emergency: "#F63232",

        "gray-light": "#d3dce6",
      },
    },
  },
  plugins: [],
};
