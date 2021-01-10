const home_router = require("./home");
const contact_router = require("./contact");
const about_router = require("./about");
const admin_router = require("./admin");
const blog_router = require("./blog");
const developer_router = require("./developer");
module.exports = (app) => {
  app.use(home_router);
  app.use(contact_router);
  app.use(about_router);
  app.use(admin_router);
  app.use(blog_router);
  app.use(developer_router);
  // etc..
};
