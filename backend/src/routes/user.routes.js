import { Router } from "express";
import { registerUser,loginUser, isAuthorized} from "../controllers/user.controller.js";
import { varifyJwt } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/isAuthorized").get(varifyJwt, isAuthorized);


export default router;