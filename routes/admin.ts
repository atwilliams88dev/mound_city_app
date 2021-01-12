import Router from "express-promise-router";
// import db from "../db";
// import logger from "../logger";

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const admin_router = Router();
// export our router to be mounted by the parent application

admin_router.get("/admin", async (req, res) => {
  res.render("admin.njk");
});
export default admin_router;
