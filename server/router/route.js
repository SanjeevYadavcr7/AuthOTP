import { Router } from "express";
import * as controller from '../controllers/appController.js';

const router = Router();

router.route('/register').post(controller.register);
// router.route('/registerMail').post();
router.route('/authenticate').post((req,res) => res.end());
router.route('/login').post(controller.login);

router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.gernerateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

router.route('/updateuser').put(controller.updateUser);
router.route('/resetPassword').put(controller.resetPassword);

export default router;