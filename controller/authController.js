import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../model/userModel.js";
import Jwt from "jsonwebtoken";
import orderModel from "../model/orederModel.js";


// registeration router
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        // validation
        if (!name) {
            return res.send({ messaage: "name is require" })
        }

        if (!email) {
            return res.send({ messaage: "email is require" })
        }

        if (!password) {
            return res.send({ messaage: "password is require" })
        }

        if (!phone) {
            return res.send({ messaage: "phone no is require" })
        }

        if (!address) {
            return res.send({ messaage: "address is require" })
        }

        if (!answer) {
            return res.send({ messaage: "answer is require" })
        }

        // check user
        const existingUser = await userModel.findOne({ email });

        // existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'already Register please login'
            })
        }

        // register user
        const hashedPassword = await hashPassword(password);
        //save

        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save()

        res.status(200).send({
            success: true,
            message: "User Register successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in registeration',
            error
        })
    }
};

//login router

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                messaage: 'Invalid Email or Password'
            })
        }

        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not Register"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            })
        }
        // get user id
        const user_id = user._id

        // token

        const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '10d' });
        res.status(200).send({
            success: true,
            messaage: "login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
            user_id
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}

// forgotPasswordController

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ messaage: "email is required" })
        }
        if (!answer) {
            res.status(400).send({ messaage: "answer is required" })
        }
        if (!newPassword) {
            res.status(400).send({ messaage: "newPassword is required" })
        }

        // check
        const user = await userModel.findOne({ email, answer });
        // validation
        if (!user) {
            return res.status(404).send({
                status: false,
                messaage: "wrong Email or Password"
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            status: true,
            messaage: "Password Reset Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        });
    }
}

//filter order controller
export const getOrderController = async (req, res) => {
    try {
        const orders = await orderModel.find({user_id:req.body.ID})
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Geting Orders",
            error,
        });
    }
}

// get all orders controller
export const getAllOrderController = async (req, res) => {
    try {
        
        const orders = await orderModel.find()
        res.json(orders);
        console.log(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
}









