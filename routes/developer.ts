const Router = require("express-promise-router");
const db = require("../db");
const logger = require("../logger");
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const developer_router = new Router();
// export our router to be mounted by the parent application

developer_router.get("/developer", async (req, res) => {
  res.render("developers.njk");
});
module.exports = developer_router;
