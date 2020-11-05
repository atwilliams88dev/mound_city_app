require("dotenv").config();
const Router = require("express-promise-router");
const db = require("../db");
const logger = require("../logger");
const csurf = require('csurf')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);
const { body, validationResult } = require('express-validator');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const contact_router = new Router();
contact_router.use(csurf({cookie: true}))
// export our router to be mounted by the parent application

contact_router.get("/contact", async (req, res) => {
  const {join, hire} = req.query
  res.render("contact.njk", {
    phone: process.env.PHONE_NUMBER,
    email: process.env.EMAIL,
    user_firstName: "",
    user_lastName: "",
    user_email: "",
    user_phone: "",
    join: join || false,
    hire: hire || false,
    csrfToken: req.csrfToken()
  });
});

contact_router.post("/contact", 
[
  body('email').isEmail().isLength({
    min: 4,
  }).withMessage("email is off"),
  body('phone').isLength({
    min: 9,
  }).withMessage("A phone is required"),

  body('firstName').isString().isLength({
    min: 2,
  }).withMessage("Your first name is required"),
  body('lastName').isString().isLength({
    min: 2,
  }).withMessage("Your last name is required"),
]
,async (req, res) => {
  const errors =  validationResult(req);
  const {firstName, lastName, phone, email, i_want_to } = req.body;
  errors.array().map(err=>console.log(err))
  if (!errors.isEmpty()) {
    return res.render("contact.njk", {
      phone: process.env.PHONE_NUMBER,
      email: process.env.EMAIL,
      user_firstName: firstName || "",
      user_lastName: lastName || "",
      user_email: email || "",
      user_phone: phone || "",
      join: i_want_to === "join" || false,
      hire: i_want_to === "hire" || false,
      success: false,
      errors: errors.array().map(err=>err.msg),
      csrfToken: req.csrfToken()

    });
  }
  client.messages.create({
     body: `new request from moundcity.io - I want to ${i_want_to} you! |  ${lastName}, ${firstName} - ${email} ${phone}`,
     from: twilioNumber,
     to: `+1${process.env.PHONE_NUMBER.replace(" ","")}`
   })
  .then(message => {
    // console.log(message.sid)
    res.render("contact.njk", {
      phone: process.env.PHONE_NUMBER,
      email: process.env.EMAIL,
      user_firstName: "",
      user_lastName: "",
      user_email: "",
      user_phone: "",
      join: false,
      hire: false,
      success: true,
      errors: []
    });
  }).catch(err =>{
    res.render("contact.njk", {
      phone: process.env.PHONE_NUMBER,
      email: process.env.EMAIL,
      user_firstName: "",
      user_lastName: "",
      user_email: "",
      user_phone: "",
      join: false,
      hire: false,
      success: false,
      errors: [{msg: "something weirds going on... try again or just email or call us"}],
      csrfToken: req.csrfToken()
    });
  })

});
module.exports = contact_router;
