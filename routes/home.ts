import { Request, Response } from "express";
import Router from "express-promise-router";
// import db from "../db";
// import logger from "../logger";
import {
  ELEVATOR_PITCH,
  ELEVATOR_PITCH_EXPANDED,
  APPLICATION_DEVELOPMENT,
  APP_DESIGN,
  CONTENT_CREATION,
  BRAIN_STORMING,
  ANIMATION,
  VIDEOGRAPHY,
} from "../content/home";
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const home_router = Router();
// export our router to be mounted by the parent application

home_router.get("/", async (req: Request, res: Response) => {
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
  type HomeContextType = {
    phoneNumber: string;
    elevatorPitch: string;
    elevatorPitchExpanded: string;
    applicationDevelopment: string;
    contentCreation: string;
    brainStorming: string;
    appDesign: string;
    animation: string;
    videography: string;
    loggedIn: boolean;
  };
  const HomeContext: HomeContextType = {
    phoneNumber: process.env.PHONE_NUMBER,
    elevatorPitch: ELEVATOR_PITCH,
    elevatorPitchExpanded: ELEVATOR_PITCH_EXPANDED,
    applicationDevelopment: APPLICATION_DEVELOPMENT,
    contentCreation: CONTENT_CREATION,
    brainStorming: BRAIN_STORMING,
    appDesign: APP_DESIGN,
    animation: ANIMATION,
    videography: VIDEOGRAPHY,
    loggedIn: res.locals.loggedIn,
  };
  res.render("home.njk", HomeContext);
});
export default home_router;
