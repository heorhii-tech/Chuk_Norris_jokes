module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        sub_main_color: "#ABABAB",
        light_grey: "#F8F8F8",
      },
    },
  },
  plugins: [require("tailwindcss/nesting"), require("autoprefixer")],
};
