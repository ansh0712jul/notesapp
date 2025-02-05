import { Router } from "express";
import { registerUser , loginUser, logoutUser, refreshAccessToken} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/sign-up").post(registerUser);
router.route("/sign-in").post(loginUser);
router.route("/sign-out").post(verifyJwt , logoutUser);
router.route("/refresh-accessToken").post(refreshAccessToken)
export default router;