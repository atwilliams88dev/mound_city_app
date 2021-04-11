import Router from "express-promise-router";
import db from "../db";
import { Request } from "express";

import protection_middleware from "../middleware/protection";
import logger from "../logger";
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
interface RequestWithMiddleWare extends Request {
  csrfToken: () => void;
}
const blog_router = Router();
// export our router to be mounted by the parent application

blog_router.get("/blog", async (req, res) => {
  //   const { id } = req.params;
  const { rows } = await db.query(
    `
    SELECT posts.content, posts.name, posts.description, posts.logo, posts.day, posts.id, users.first_name, users.last_name, users.company
    FROM posts
    INNER JOIN users
    ON posts.author = users.email
    WHERE day <= $1;
    `,
    [new Date().toISOString().split("T")[0]]
  );
  console.log(rows);
  res.render("blog.njk", {
    rows: rows,
    first_name: res.locals.first_name,
    last_name: res.locals.last_name,
    company: res.locals.company,
    user_role: res.locals.user_role,
    user_email: res.locals.user_email,
    is_admin:
      res.locals.user_role === "super_admin" ||
      res.locals.user_role === "admin",
  });
});

//Create new blog post
blog_router.get(
  "/blog/new",
  protection_middleware(["super_admin"]),
  (req: RequestWithMiddleWare, res) => {
    res.render("blog_new.njk", {
      csrfToken: req.csrfToken(),
      first_name: res.locals.first_name,
      last_name: res.locals.last_name,
    });
  }
);

//Update blog post

blog_router.get(
  "/blog/edit/:id",
  protection_middleware(["super_admin"]),
  (req, res) => {
    // TODO look up by id and insert into context
    res.render("blog_new.njk");
  }
);

//Create new blog post  - just copied get for now
// TODO HANDLE SAVE
blog_router.post(
  "/blog/new",
  protection_middleware(["super_admin"]),
  async (req, res) => {
    const { title, description, release, content, category, link } = req.body;
    if (!title || !description || !release || !content || !category) {
      res.send("You are missing a field");
      return;
    }
    let logo = "";
    if (category === "web_dev" || category === "web_design") {
      logo = "webDesignLogo.svg";
    }
    if (category === "app_dev" || category === "app_design") {
      logo = "webDesignLogo.svg";
    }
    if (category === "small_biz") {
      logo = "webDesignLogo.svg";
    }
    if (category === "big_biz") {
      logo = "webDesignLogo.svg";
    }
    if (category === "agile") {
      logo = "webDesignLogo.svg";
    }
    if (category === "marketing") {
      logo = "webDesignLogo.svg";
    }
    if (category === "video") {
      logo = "webDesignLogo.svg";
    }
    if (category === "other") {
      logo = "webDesignLogo.svg";
    }

    console.log(content);
    let results = await db.query(
      `
    INSERT INTO posts
    (author, name, description, logo, day, content, link)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id;
    `,
      [
        res.locals.user_email,
        title,
        description,
        logo,
        release,
        content,
        link || null,
      ]
    );
    console.log({ results });
    res.status(201).send(results.rows[0].id);
  }
);

//todo add route to set active false

blog_router.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(
    `
    SELECT posts.content, posts.link, posts.name, posts.description, posts.logo, posts.day, posts.id, users.first_name, users.last_name, users.company
    FROM posts
    INNER JOIN users
    ON posts.author = users.email
    WHERE id = $1;`,
    [id]
  );
  console.log(rows[0]);
  res.render("blog_detail.njk", {
    article: rows[0],
    content: rows[0].content,
    link: rows[0].link || null,
  });
});
export default blog_router;
