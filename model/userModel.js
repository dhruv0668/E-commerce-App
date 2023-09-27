import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    answer:{
        type:String,
        required:true,
        trim:true
    },
    role:{ 
        type:Number,
        default: 0,
        trim:true
    }
},{timestamps:true})


export default mongoose.model('user', userSchema)   