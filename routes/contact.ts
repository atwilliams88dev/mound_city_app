/* eslint-disable @typescript-eslint/no-var-requires */
// IMPORT ENV VARIABLES
require("dotenv").config();
import { ProcessEnv } from "../types";
declare let process: {
  env: ProcessEnv;
};
import { content } from "../content/contact";
const env: ProcessEnv = process.env;
import Router from "express-promise-router";
// import db from "../db";
// import logger from "../logger";
import csurf from "csurf";
import { Request } from "express";
const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = env.TWILIO_AUTH_TOKEN;
const twilioNumber = env.TWILIO_NUMBER;
const twilioMessagingSid = env.TWILIO_MESSAGING_SID;
const client = require("twilio")(accountSid, authToken);
const { body, validationResult } = require("express-validator");
const sgMail = require("@sendgrid/mail");

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const contact_router = Router();
contact_router.use(csurf({ cookie: true }));
// export our router to be mounted by the parent application

interface RequestWithMiddleWare extends Request {
  csrfToken: () => void;
}
contact_router.get("/contact", async (req: RequestWithMiddleWare, res) => {
  const { join, hire } = req.query;
  res.render("contact.njk", {
    content,
    phone: process.env.PHONE_NUMBER,
    email: process.env.EMAIL,
    user_firstName: "",
    user_lastName: "",
    user_email: "",
    user_phone: "",
    join: join || false,
    hire: hire || false,
    services: [],
    skills: [],
    csrfToken: req.csrfToken(),
  });
});

//TODO ADD EMAIL AS WELL TO THIS
contact_router.post(
  "/contact",
  [
    body("email")
      .isString()
      .isLength({
        min: 4,
      })
      .withMessage("email is not valid"),
    body("phone")
      .isLength({
        min: 9,
      })
      .withMessage("A phone is required"),

    body("firstName")
      .isString()
      .isLength({
        min: 2,
      })
      .withMessage("Your first name is required"),
    body("lastName")
      .isString()
      .isLength({
        min: 2,
      })
      .withMessage("Your last name is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const {
      firstName,
      lastName,
      phone,
      email,
      i_want_to,
      services,
      skills,
    } = req.body;
    // console.log("services " + services);
    errors.array().map((err) => console.log(err));
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
        services: services || [],
        skills: skills || [],
        errors: errors
          .array()
          .map((err) => (err.msg !== "Invalid value" ? err.msg : null))
          .filter((val) => val),
        csrfToken: req.csrfToken(),
      });
    }

    // EMAIL USER NEW ROUTE TO RESET PASSWORD
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: "atwilliams88dev@gmail.com", // Change to your recipient
      from: "alex@moundcity.io", // Change to your verified sender
      subject: "Mound City Contact Form",
      text: "A link is attach",
      html: `new request from moundcity.io - I want to ${i_want_to} you! for ${
        services ? services : skills
      } |  ${lastName}, ${firstName} - ${email} ${phone}`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent  for contact form");
      })
      .catch((error) => {
        console.error(error);
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
          services: services || [],
          skills: skills || [],
          errors: [
            {
              msg:
                "something weirds going on... try again or just email or call us",
            },
          ],
          csrfToken: req.csrfToken(),
        });
      });

    client.messages
      .create({
        body: `new request from moundcity.io - I want to ${i_want_to} you! for ${
          services ? services : skills
        } |  ${lastName}, ${firstName} - ${email} ${phone}`,
        messagingServiceSid: twilioMessagingSid,

        from: twilioNumber,
        to: `+1${process.env.PHONE_NUMBER.replace(" ", "")}`,
      })
      .then((message) => {
        console.log(message.sid);
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
          errors: [],
        });
      })
      .catch((err) => {
        console.log(err);
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
          services: services || [],
          skills: skills || [],
          errors: [
            {
              msg:
                "something weirds going on... try again or just email or call us",
            },
          ],
          csrfToken: req.csrfToken(),
        });
      });
  }
);
export default contact_router;
