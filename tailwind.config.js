module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /(bg|color|border)-*/,
    },
    {
      pattern: /w-(24|20|10)/,
    },
    {
      pattern: /(bottom|top)-2/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
