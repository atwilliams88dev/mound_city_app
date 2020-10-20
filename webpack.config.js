const path = require("path");

module.exports = {
  entry: "./static/scripts/src",
  output: {
    path: path.resolve(__dirname, "./static/scripts/dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
