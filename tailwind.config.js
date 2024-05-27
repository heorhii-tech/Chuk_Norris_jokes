module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        sub_main_color: "#ABABAB",
        light_grey: "#F8F8F8",
      },
      spacing: {
        "540px": "540px",
        "680px": "680px",
      },
      screens: {
        laptop: "1024px",

        desktop: "1280px",
      },
      fontSize: {
        s: ["12px", "12px"],
      },
    },
  },
  plugins: [require("tailwindcss/nesting"), require("autoprefixer")],
};
