import Router from "express-promise-router";
// import db from "../db";
// import logger from "../logger";

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const developer_router = Router();
// export our router to be mounted by the parent application

developer_router.get("/developer", async (req, res) => {
  res.render("developers.njk");
});
export default developer_router;
