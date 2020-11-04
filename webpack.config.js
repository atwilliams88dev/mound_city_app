const path = require("path");

// If a single file grows too large consider code splitting

module.exports = {
  mode: "production",
  watch: false,
  entry: {
    home: "./static/scripts/src/home_page_scripts/home.js",
    contact: "./static/scripts/src/contact_page_scripts/contact.js",
    about: "./static/scripts/src/about_page_scripts/about.js",
    blog: "./static/scripts/src/blog_page_scripts/blog.js",
    developer: "./static/scripts/src/developer_page_scripts/developer.js",
    inputmask: "./static/scripts/src/inputmask.js"
  },
  output: {
    path: path.resolve(__dirname, "./static/scripts/dist"),
    filename: "[name].js",
  },
  plugins: [],

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
      {
        test: /\.(png|jpg|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },

    ],
  },
};
