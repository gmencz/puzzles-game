const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pusab", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
