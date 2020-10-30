const Router = require("express-promise-router");
const db = require("../db");
const logger = require("../logger");
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const about_router = new Router();
// export our router to be mounted by the parent application

about_router.get("/about", async (req, res) => {
  res.render("about.njk");
});
module.exports = about_router;
