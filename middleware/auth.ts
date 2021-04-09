import db from "../db";

async function auth_middleware(req, res, next) {
  let session_id = res.cookie.session_id;
  if (session_id) {
    let session = await db.query("SELECT * FROM sessions WHERE id =$1", [
      session_id,
    ]);
    console.log(session);
  }
  next();
}
module.exports = auth_middleware;
