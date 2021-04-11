import db from "./db";

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
const auth_middleware = require("./middleware/auth");
import { compareAsc } from "date-fns";

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
app.set("trust proxy", 1); // trust first proxy
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(auth_middleware);

nunjucks.configure("views", {
  autoescape: false,
  express: app,
});

// MOUNT ROUTES
mountRoutes(app);

app.listen(PORT, () => console.log(`App up on ${PORT}`));
