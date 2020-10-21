// IMPORT ENV VARIABLES
require("dotenv").config();
// 3RD PARTY PACKAGES
const express = require("express");
const nunjucks = require("nunjucks");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const compression = require("compression");

// APP CONFIG
const app = express();
let PORT = process.env.PORT || 3000;
const mountRoutes = require("./routes");

// MIDDLEWARE
app.use(cookieParser());
app.use(express.json());
app.use("/static", express.static(__dirname + "/static/"));

// PROD ONLY MIDDLEWARE
if (process.env.NODE_ENV === "PRODUCTION") {
  // requires all data calls at https
  app.use(helmet());
  app.use(compression());
}

// SETUP VIEWS
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// MOUNT ROUTES
mountRoutes(app);

app.listen(PORT, () => console.log(`App up on ${PORT}`));
