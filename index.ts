// IMPORT ENV VARIABLES
require("dotenv").config();
export interface ProcessEnv {
  [key: string]: string | undefined | number;
  EXPRESS_PORT?: number;
}
let env: ProcessEnv = process.env;
// 3RD PARTY PACKAGES
const express = require("express");
const nunjucks = require("nunjucks");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const bodyParser = require("body-parser");
// APP CONFIG
const app = express();
let PORT = env.EXPRESS_PORT || 3000;
const mountRoutes = require("./routes");

// MIDDLEWARE
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use("/static", express.static(__dirname + "/static/"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
// PROD ONLY MIDDLEWARE
// if (process.env.NODE_ENV === "production") {
//   // requires all data calls at https
//   app.use(helmet());
//   app.use(compression());
// }

// app.use(helmet());
// SETUP VIEWS
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// MOUNT ROUTES
mountRoutes(app);

app.listen(PORT, () => console.log(`App up on ${PORT}`));
