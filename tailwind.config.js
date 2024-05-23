export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        beige: "#F4E9E1",
        mustard: "#f2cb50",
        "light-blue": "#D3E6EF",
        "light-pink": "#fad7d9",
        "primary-pink": "#FFBBBE",
        "voice-orange": "#F2682F",
        "advice-green": "#00A463",
      },
      screens: {
        // This is just to allow 1 more breakpoint than the default, can be changed to something else as long as its equal or smaller than 576px
        xs: "476px",
      },
    },
    fontFamily: {
      sans: ["soleil", "sans-serif"],
      serif: ["rooney-web", "serif"],
    },
  },
  plugins: [],
};
