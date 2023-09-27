import  express  from "express";
import { getUserController } from "../controller/userController.js";


//router object
const router = express.Router();

// get all user
router.get("/get-user", getUserController)

export default router
