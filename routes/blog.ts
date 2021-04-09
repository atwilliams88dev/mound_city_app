import Router from "express-promise-router";
import db from "../db";
import logger from "../logger";
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const blog_router = Router();
// export our router to be mounted by the parent application

blog_router.get("/blog", async (req, res) => {
  //   const { id } = req.params;
  const { rows } = await db.query(
    "SELECT * FROM posts CROSS JOIN users WHERE active = true"
  );
  console.log(rows);
  // console.log(rows);
  // db.query('SELECT * from "mound_users" ', (err, result) => {
  //   if (err) {
  //     console.error(err + "error");
  //   }
  //   console.log(JSON.stringify(result.rows[0].email));
  //   const email = result.rows[0].email;
  //   res.render("home.njk", { email: email });
  // });
  // try {
  //   const { rows } = await db.query('SELECT * FROM "mound_users" WHERE id=$1', [
  //     1,
  //   ]);
  //   const { email } = rows[0];
  //   res.render("home.njk", { email: email });
  // } catch (err) {
  //   logger.info(`in combo`);

  //   logger.error(`${err}`);

  //   res.status(500).render("500.njk");
  // }
  res.render("blog.njk", { rows: rows });
});

blog_router.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  const {
    rows,
  } = await db.query("SELECT * FROM posts CROSS JOIN users WHERE id = $1", [
    id,
  ]);
  console.log(rows);
  // console.log(rows);
  // db.query('SELECT * from "mound_users" ', (err, result) => {
  //   if (err) {
  //     console.error(err + "error");
  //   }
  //   console.log(JSON.stringify(result.rows[0].email));
  //   const email = result.rows[0].email;
  //   res.render("home.njk", { email: email });
  // });
  // try {
  //   const { rows } = await db.query('SELECT * FROM "mound_users" WHERE id=$1', [
  //     1,
  //   ]);
  //   const { email } = rows[0];
  //   res.render("home.njk", { email: email });
  // } catch (err) {
  //   logger.info(`in combo`);

  //   logger.error(`${err}`);

  //   res.status(500).render("500.njk");
  // }
  res.render("blog_detail.njk", { article: rows[0] });
});
export default blog_router;
