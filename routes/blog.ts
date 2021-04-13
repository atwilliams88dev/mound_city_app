import Router from "express-promise-router";
import db from "../db";
import { Request } from "express";

import protection_middleware from "../middleware/protection";

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
  "/blog/edit",

  protection_middleware(["super_admin"]),
  async (req: RequestWithMiddleWare, res) => {
    console.log(req.query);
    if (!req.query.id) {
      res.status(400).render("generic.njk", {
        title: "Something went wrong",
        content: "Blog Id is missing.",
      });
      return;
    }
    // TODO look up by id and insert into context
    let results = await db.query(
      `
      SELECT *
      FROM posts
      WHERE id = $1
      `,
      [req.query.id]
    );
    const data = results.rows[0];
    console.log({ data });
    res.render("blog_edit.njk", {
      csrfToken: req.csrfToken(),
      first_name: res.locals.first_name,
      last_name: res.locals.last_name,
      title: data.name,
      active: data.active,
      description: data.description,
      release: data.day.toISOString().split("T")[0],
      link: data.link,
      content: data.content,
      category: "",
    });
  }
);

// update blog post
//Create new blog post
blog_router.put(
  "/blog/edit",
  protection_middleware(["super_admin"]),

  async (req, res) => {
    if (!req.query.id) {
      res.status(400).render("generic.njk", {
        title: "Something went wrong",
        content: "Blog Id is missing.",
      });
      return;
    }
    const { title, description, release, content, link } = req.body;
    if (!title || !description || !release || !content) {
      res.send("You are missing a field");
      return;
    }

    console.log(release);
    let results = await db.query(
      `
    UPDATE posts
    SET author=$1, name=$2, description=$3, day=$4, content=$5, link=$6
    WHERE id=$7
    RETURNING id;
    `,
      [
        res.locals.user_email,
        title,
        description,
        release,
        content,
        link || null,
        req.query.id,
      ]
    );
    console.log({ results });
    res.status(201).send(results.rows[0].id);
  }
);

//Create new blog post
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
    is_admin:
      res.locals.user_role === "super_admin" ||
      res.locals.user_role === "admin",
  });
});
export default blog_router;
