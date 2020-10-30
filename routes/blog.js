const Router = require("express-promise-router");
const db = require("../db");
const logger = require("../logger");
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const blog_router = new Router();
// export our router to be mounted by the parent application

blog_router.get("/blog", async (req, res) => {
  res.render("blog.njk");
});
module.exports = blog_router;
