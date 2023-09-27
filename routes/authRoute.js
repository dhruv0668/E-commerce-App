import express  from "express";
import {registerController, loginController, forgotPasswordController, getOrderController, getAllOrderController} from '../controller/authController.js'
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

// routing

router.post("/register", registerController);
router.post("/login", loginController);

// forgot password

router.post("/forgot-password", forgotPasswordController)

// procted user routes

router.get("/user-auth",requireSignIn, (req,res) => {
    res.status(200).send({ok:true});
})

// procted admin routes

router.get("/admin-auth",requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ok:true});
})

//order
router.post("/orders", getOrderController)

// all orders
router.get("/all-orders", getAllOrderController)




export default router