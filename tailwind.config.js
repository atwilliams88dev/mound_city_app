const {
  colors: { teal, orange, pink, ...colors },
} = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: {
    layers: ["utilities"],
    content: [
      // Paths to your templates...
      "./static/scripts/dist/bundle.js",
    ],
  },
  theme: {
    colors: {
      ...colors,
      off: "#F7FAFC",
      primary: "#270A49",
      secondary: "#F95B3D",
      dark: "#42445D",
      darker: "#333242",
      yellow: "#FFB725",
      brightBlue: "#0D5BD9",
      babyBlue: "#EFF5FF",
      primaryBlue: "#0A429F",
    },
    fontFamily: {
      montserrat: ["Montserrat"],
      quicksand: ["Quicksand"],
    },
  },
  variants: {},
};
