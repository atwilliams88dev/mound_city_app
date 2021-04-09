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

app.use(async function (req, res, next) {
  let session_id = req.cookies.session_id;
  if (session_id) {
    let session_results = await db.query(
      "SELECT * FROM sessions WHERE id =$1",
      [session_id]
    );
    let { rows } = session_results;
    let today = new Date();
    let isExpiredSession = compareAsc(today, rows[0].expires_on);
    if (isExpiredSession > 0) {
      console.log("not valid session");
      res.locals.loggedIn = false;
    } else {
      console.log("valid session");
      res.locals.loggedIn = true;
    }
  }
  next();
});

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// MOUNT ROUTES
mountRoutes(app);

app.listen(PORT, () => console.log(`App up on ${PORT}`));
