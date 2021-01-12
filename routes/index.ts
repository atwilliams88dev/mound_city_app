/* eslint-disable @typescript-eslint/no-var-requires */
import * as express from "express";
import home_router from "./home";
import contact_router from "./contact";
import about_router from "./about";
import admin_router from "./admin";
import blog_router from "./blog";
import developer_router from "./developer";

module.exports = (app: express.Application) => {
  app.use(home_router);
  app.use(contact_router);
  app.use(about_router);
  app.use(admin_router);
  app.use(blog_router);
  app.use(developer_router);
};
