require("dotenv").config();
const Router = require("express-promise-router");
const db = require("../db");
const logger = require("../logger");
const csurf = require('csurf')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const contact_router = new Router();
contact_router.use(csurf({cookie: true}))
// export our router to be mounted by the parent application

contact_router.get("/contact", async (req, res) => {
  res.render("contact.njk", {
    phone: process.env.PHONE_NUMBER,
    email: process.env.EMAIL,
    user_firstName: "",
    user_lastName: "",
    user_email: "",
    user_phone: "",
    join: false,
    hire: false,
    csrfToken: req.csrfToken()
  });
});

contact_router.post("/contact", async (req, res) => {
  console.log(req.body)
  res.render("contact.njk", {
    phone: process.env.PHONE_NUMBER,
    email: process.env.EMAIL,
    user_firstName: "Alex",
    user_lastName: "Williams",
    user_email: "atwilliams88@gmail.com",
    user_phone: "6182679893",
    join: false,
    hire: true,
    
  });
});
module.exports = contact_router;
