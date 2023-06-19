import { Router } from "express";
const router = Router()
import Auth from "../middleware/auth.js";
import { localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";
import * as controller from '../controllers/appController.js'
// POST METHODS
router.route('/register').post(controller.register)
router.route("/registerMail").post(registerMail); //send email
router.route("/auth").post(controller.verifyUser,(req,res)=>res.end());
router.route("/login").post(controller.login);


// GET METHODS
router.route("/user/:username").get(controller.getUser); //get user with username
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariables, controller.generateOTP);
router.route("/verifyOTP").get(controller.verifyUser,controller.verifyOTP); //verify generated OTP
router.route("/createResetSession").get(controller.createResetSession);


// PUT METHODS
router.route("/updateuser").put(Auth,controller.updateUser);
router.route("/resetPassword").put(controller.resetPassword);




export default router