require("dotenv").config();
import Router from "express-promise-router";
import { Request } from "express";
import db from "../db";
import bcrypt from "bcrypt";
import csurf from "csurf";
import { v4 as uuidv4 } from "uuid";
const sgMail = require("@sendgrid/mail");

// HANDLE LOGIN, LOGOUT, PASSWORD RESET, CREATE ACCOUNTS
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
auth_router.post("/auth/login", async (req: RequestWithMiddleWare, res) => {
  // GET EMAIL AND PASSWORD
  const { email, password } = req.body;
  if (!email || !password) {
    res.render("login.njk", {
      email: email || "",
      password: password || "",
      message: "A valid email and password are required.",
      csrfToken: req.csrfToken(),
    });
    return;
  }
  // FIND RESULT FROM USER TABLE BASED ON EMAIL
  let results = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  if (results) {
    // SELECT THE USER
    let user = results.rows[0];
    if (user) {
      // CHECK THE REGULAR PASSWORD AND THE HASHED PASSWORD
      bcrypt.compare(password, user.password, async function (err, result) {
        if (err) {
          res
            .status(500)
            .send("an error occurred while validating your password");
        }
        if (result === true) {
          // CREATE A SESSION IN THE DB AND SAVE COOKIE THEN REDIRECT TO HOME PAGE.
          let sessionId = uuidv4();
          let createSessionText = "INSERT INTO sessions VALUES($1,$2)";
          let sessionValues = [sessionId, user.email];
          let sess = await db.query(createSessionText, sessionValues);
          res.cookie("session_id", sessionId);
          res.redirect("/");
        } else {
          res.render("login.njk", {
            email: email || "",
            password: password || "",
            message:
              "Incorrect password, please try again or reset your password.",
            csrfToken: req.csrfToken(),
          });
        }
      });
    }
    // USER BUT NOT VALID PASSWORD
    else {
      res.locals.company = "";
      res.locals.role = "";
      res.locals.loggedIn = false;
      res.render("login.njk", {
        email: email || "",
        password: password || "",
        message:
          "Your password was not correct. Please try again or reset your password.",
        csrfToken: req.csrfToken(),
      });
      return;
    }
  } else {
    res.locals.company = "";
    res.locals.role = "";
    res.locals.loggedIn = false;
    res.render("generic.njk", {
      title: "User not found",
      content: "We did not find a user with that email address.",
    });
  }
});

// HANDLE LOGOUT
auth_router.get("/auth/logout", async (req, res) => {
  let session_results = await db.query(
    "UPDATE sessions set expires_on=now()-'1 day'::interval WHERE id =$1",
    [req.cookies.session_id]
  );
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
  const { email, password, first_name, last_name, company } = req.body;
  if (!email || !password || !first_name || !last_name || !company) {
    res.render("generic.njk", {
      title: "You missed a field",
      content: "Please creating an account again.",
    });
  }
  const text =
    "INSERT INTO users (email, password, first_name, last_name, company) VALUES($1, $2, $3, $4, $5)";
  const hash = bcrypt.hashSync(password, 5);
  const values = [email, hash, first_name, last_name, company];
  let data = await db.query(text, values);
  res.render("generic.njk", {
    title: "Success!",
    content: "Your account has been created. You may now login.",
  });
});

// HANDLE PASSWORD RESET REQUEST- user inters email address
auth_router.get(
  "/auth/password/reset",
  function (req: RequestWithMiddleWare, res) {
    res.render("password_reset.njk", {
      csrfToken: req.csrfToken(),
    });
  }
);

// PAGE TO ENTER NEW PASSWORD
auth_router.get(
  "/auth/password/new:id?",
  function (req: RequestWithMiddleWare, res) {
    if (!req.query.id) {
      res.render("generic.njk", {
        title: "404 Error",
        content: "Something Went Wrong...",
      });
      return;
    }
    res.render("password_new.njk", {
      csrfToken: req.csrfToken(),
      id: req.query.id,
    });
  }
);

auth_router.post(
  "/auth/password/new:id?",
  async function (req: RequestWithMiddleWare, res) {
    const { password, password2 } = req.body;
    if (password !== password2) {
      res.render("password_new.njk", {
        csrfToken: req.csrfToken(),
        id: req.query.id,
        message: "Email and Confirmation Email did not match.",
      });
      return;
    } else {
      const hash = bcrypt.hashSync(password, 5);
      let results = await db.query(
        `
          UPDATE users
          SET password=$1, password_reset_id=$2
          WHERE password_reset_id=$3
          RETURNING email;
          `,
        [hash, "", req.query.id]
      );

      if (results) {
        console.log({ results });
        res.render("generic.njk", {
          title: "Your Password Is Updated",
        });
      }
    }
  }
);

auth_router.post(
  "/auth/password/reset",
  async function (req: RequestWithMiddleWare, res) {
    console.log(req.body);
    let { email } = req.body;
    // HANDLE NO EMAIL
    if (!email) {
      res.render("password_reset.njk", {
        csrfToken: req.csrfToken(),
        id: req.query.id,
        email: "",
        message: "Please enter a valid email address.",
      });
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
      res.render("password_reset.njk", {
        csrfToken: req.csrfToken(),
        id: req.query.id,
        email: email,
        message: "No user found with email below.",
      });
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
      html: `
    <p>Hello,</p>
    <p>We've received a request to reset the password for your Mound City account associated with ${email}.
    No changes have been made to your account yet.</p>
    <p>You can reset your password by clicking the link below:</p>
    <div><!--[if mso]>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3001/auth/password/reset" style="height:42px;v-text-anchor:middle;width:156px;" arcsize="10%" strokecolor="#0A429F" fillcolor="#0A429F">
        <w:anchorlock/>
        <center style="color:#ffffff;font-family:sans-serif;font-size:13px;font-weight:bold;">Reset Password</center>
      </v:roundrect>
    <![endif]--><a href=https://moundcity.io/auth/password/new?id=${results.rows[0].password_reset_id}
    style="background-color:#0A429F;border:1px solid #0A429F;border-radius:4px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:42px;text-align:center;text-decoration:none;width:156px;-webkit-text-size-adjust:none;mso-hide:all;">Reset Password</a></div>

    `,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent ");
        res.render("generic.njk", {
          title: "Password Reset Email Sent",
          content:
            "Please go check your email and follow instructions from there.",
        });
      })
      .catch((error) => {
        console.error(error);
        res.render("generic.njk", {
          title: "Password Reset Email Failed",
          content:
            "Something went wrong with our email server. Please try again, if the issue persist please email us directly.",
        });
      });
  }
);

export default auth_router;
