const home_router = require("./home");

module.exports = (app) => {
  app.use(home_router);
  // etc..
};
