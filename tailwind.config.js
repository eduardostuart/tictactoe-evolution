module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /(bg|color|border)-*/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
