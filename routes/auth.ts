require("dotenv").config();
import Router from "express-promise-router";
import { Request } from "express";
import db from "../db";
import bcrypt from "bcrypt";
import csurf from "csurf";
import { v4 as uuidv4 } from "uuid";
const sgMail = require("@sendgrid/mail");

// HANDLE LOGIN, LOGOUT, CREATE ACCOUNTS
const auth_router = Router();
// export our router to be mounted by the parent application
auth_router.use(csurf({ cookie: true }));
interface RequestWithMiddleWare extends Request {
  csrfToken: () => void;
}

// LOGIN PAGE
auth_router.get("/auth/login", async (req: RequestWithMiddleWare, res) => {
  res.render("login.njk", {
    csrfToken: req.csrfToken(),
  });
});

// HANDLE LOGIN REQUEST
auth_router.post("/auth/login", async (req, res) => {
  // GET EMAIL AND PASSWORD
  const { email, password } = req.body;
  if (!email || !password) {
    // TODO ADD ERROR MESSAGE TO LOGIN.NJK
    res.status(500).send("missing email or password");
  }
  // FIND RESULT FROM USER TABLE BASED ON EMAIL
  let results = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  if (results) {
    // SELECT THE USER
    let user = results.rows[0];
    // CHECK THE REGULAR PASSWORD AND THE HASHED PASSWORD
    bcrypt.compare(password, user.password, async function (err, result) {
      if (err) {
        res
          .status(500)
          .send("an error occurred while validating your password");
      }
      // CREATE A SESSION IN THE DB AND SAVE COOKIE THEN REDIRECT TO HOME PAGE.
      let sessionId = uuidv4();
      let createSessionText = "INSERT INTO sessions VALUES($1,$2)";
      let sessionValues = [sessionId, user.email];
      let sess = await db.query(createSessionText, sessionValues);
      res.cookie("session_id", sessionId);
      res.redirect("/");
    });
  } else {
    res.locals.company = "";
    res.locals.role = "";
    res.locals.loggedIn = false;
    // TODO ADD ERROR MESSAGE TO LOGIN.NJK
    res.status(500).send("user not found");
  }
});
// HANDLE LOGOUT
auth_router.get("/auth/logout", async (req, res) => {
  let session_results = await db.query(
    "UPDATE sessions set expires_on=now()-'1 day'::interval WHERE id =$1",
    [req.cookies.session_id]
  );
  console.log(session_results);
  res.redirect("/");
});

// HANDLE CREATE ACCOUNT HTML
auth_router.get("/auth/new", async (req: RequestWithMiddleWare, res) => {
  res.render("createAccount.njk", {
    csrfToken: req.csrfToken(),
  });
});

// HANDLE CREATE ACCOUNT POST
auth_router.post("/auth/new", async (req, res) => {
  // CHECK FOR REQUIRED DETAILS
  const { email, password, first_name, last_name } = req.body;
  if (!email || !password || !first_name || !last_name) {
    res.status(500).send("missing email or password");
  }
  const text =
    "INSERT INTO users (email, password, first_name, last_name) VALUES($1, $2, $3, $4) RETURNING *";
  const hash = bcrypt.hashSync(password, 5);
  const values = [email, hash, first_name, last_name];
  let data = await db.query(text, values);
  // todo figure out login redirect
  res.status(201).send("account created");
});

auth_router.post("/auth/password/reset", async function (req, res) {
  console.log(req.body);
  let { email } = req.body;
  // HANDLE NO EMAIL
  if (!email) {
    res.send("Please enter your email address and try again.");
    return;
  }
  let { rows } = await db.query(
    `
  SELECT email, last_name, first_name
  FROM users
  WHERE email=$1;
  `,
    [email]
  );
  // HANDLE NO USER FOUND WITH THAT EMAIL;
  if (rows.length === 0) {
    res.send("We are not able to find a user with that email address.");
    return;
  }
  console.log(rows[0]);
  // UPDATE THE USER AND SET HIS PASSWORD_RESET_ID
  let results = await db.query(
    `
  UPDATE users
  SET password_reset_id=$1
  WHERE email=$2
  RETURNING email, first_name, last_name, password_reset_id;
  `,
    [uuidv4(), email]
  );
  console.log(results);
  // EMAIL USER NEW ROUTE TO RESET PASSWORD
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: "alex@moundcity.io", // Change to your verified sender
    subject: "Reset Your Password for moundcity.io",
    text: "A link is attach",
    // TODO CREATE EMAIL
    html: `<a href="#">Go Somewhere with ${results.rows[0].password_reset_id}</a>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent ");
      // TODO CREATE PASSWORD RESET PAGE

      // TODO CREATE PAGE TELLING USER TO GO CHECK EMAIL
    })
    .catch((error) => {
      console.error(error);
      res.send(
        "An internal error occurred. Please try again. If the issue persist please contact us."
      );
    });

  res.send("GO CHECK EMAIL");
});

export default auth_router;
