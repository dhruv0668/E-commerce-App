import userModel from "../model/userModel.js";
import fs from "fs";


export const getUserController = async (req,res) => {
    try {
        const user = await userModel.find({})
        res.status(200).send({
            success:true,
            message:"All Users",
            total_users : user.length,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting User",
            error
        })
    }
}

