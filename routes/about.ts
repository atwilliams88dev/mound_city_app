import Router from "express-promise-router";
// import db from "../db";
// import logger from "../logger";

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const about_router = Router();
// export our router to be mounted by the parent application

about_router.get("/about", async (req, res) => {
  res.render("about.njk");
});
export default about_router;
