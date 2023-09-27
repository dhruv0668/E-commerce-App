import express from "express";
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import cors from 'cors';


// configure env
dotenv.config()

//database config
connectDB()

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use("/api/user", authRoutes)
app.use("/api/user/category", categoryRoutes)
app.use("/api/user/product", productRoutes)
app.use("/api/user/users", userRoutes)

//port

const PORT = process.env.PORT

app.listen(8080, (res, req) => {
    console.log(`app is running on ${PORT}`);
})