import db from "../db";
import { compareAsc } from "date-fns";

var auth_middleware = async function (req, res, next) {
  let session_id = req.cookies.session_id;
  if (session_id) {
    let session_results = await db.query(
      `
       SELECT *, first_name, last_name, company, role, user 
       FROM sessions
       INNER JOIN users
       ON sessions.user = users.email
	     WHERE sessions.id = $1;
      `,
      [session_id]
    );
    if (session_results.rows) {
      let { rows } = session_results;
      let today = new Date();
      let isExpiredSession = compareAsc(today, rows[0].expires_on);
      if (isExpiredSession > 0) {
        console.log("not valid session");
        res.locals.loggedIn = false;
        res.locals.first_name = null;
        res.locals.last_name = null;
        res.locals.company = null;
        res.locals.user_role = null;
        res.locals.user_email = null;
      } else {
        console.log("valid session");
        res.locals.loggedIn = true;
        res.locals.first_name = session_results.rows[0].first_name;
        res.locals.last_name = session_results.rows[0].last_name;
        res.locals.company = session_results.rows[0].company;
        res.locals.user_role = session_results.rows[0].role;
        res.locals.user_email = session_results.rows[0].email;
      }
    }
  }
  next();
};
module.exports = auth_middleware;
