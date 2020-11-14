const path = require("path");

module.exports = {
  mode: "production",
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
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
