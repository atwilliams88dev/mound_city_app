const home_router = require("./home");
const contact_router = require("./contact");
module.exports = (app) => {
  app.use(home_router);
  app.use(contact_router);
  // etc..
};
