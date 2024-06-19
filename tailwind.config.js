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
        // This is just to allow more breakpoints smaller than the default, can be changed to something else
        xxs: "320px",
        xs: "476px",
        max: "1900px",
      },
    },
    fontFamily: {
      sans: ["soleil", "inter", "sans-serif"],
      serif: ["rooney-web", "serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
    },
  },
  plugins: [],
};
