const Router = require("express-promise-router");
const db = require("../db");
const logger = require("../logger");
const homeContent = require("../content/home");
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const home_router = new Router();
// export our router to be mounted by the parent application

home_router.get("/", async (req, res) => {
  //   const { id } = req.params;
  //   const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  // db.query('SELECT * from "mound_users" ', (err, result) => {
  //   if (err) {
  //     console.error(err + "error");
  //   }
  //   console.log(JSON.stringify(result.rows[0].email));
  //   const email = result.rows[0].email;
  //   res.render("home.njk", { email: email });
  // });
  // try {
  //   const { rows } = await db.query('SELECT * FROM "mound_users" WHERE id=$1', [
  //     1,
  //   ]);
  //   const { email } = rows[0];
  //   res.render("home.njk", { email: email });
  // } catch (err) {
  //   logger.info(`in combo`);

  //   logger.error(`${err}`);

  //   res.status(500).render("500.njk");
  // }
  res.render("home.njk", {
    phoneNumber: homeContent.PHONE_NUMBER,
    elevatorPitch: homeContent.ELEVATOR_PITCH,
    elevatorPitchExpanded: homeContent.ELEVATOR_PITCH_EXPANDED,
    applicationDevelopment: homeContent.APPLICATION_DEVELOPMENT,
    contentCreation: homeContent.CONTENT_CREATION,
    brainStorming: homeContent.BRAIN_STORMING,
    appDesign: homeContent.APP_DESIGN,
    animation: homeContent.ANIMATION,
    videography: homeContent.VIDEOGRAPHY,
  });
});
module.exports = home_router;
