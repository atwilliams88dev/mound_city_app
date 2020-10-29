const path = require("path");

// If a single file grows too large consider code splitting

module.exports = {
  entry: {
    home: "./static/scripts/src/home_page_scripts/home.js",
    contact: "./static/scripts/src/contact_page_scripts/contact.js",
  },
  output: {
    path: path.resolve(__dirname, "./static/scripts/dist"),
    filename: "[name].js",
  },
  // entry: "./static/scripts/src/contact_page_scripts/contact.js",
  // output: {
  //   path: path.resolve(__dirname, "./static/scripts/dist/contact"),
  //   filename: "contact.js",
  // },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
