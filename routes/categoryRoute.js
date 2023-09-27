import  express  from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controller/categoryController.js";


//router object
const router = express.Router();

// create category
router.post("/create-category", createCategoryController);

//update category
router.put("/update-category/:id",   updateCategoryController);

// get all category
router.get("/get-category", categoryController);

//get single category
router.get("/single-category/:slug", singleCategoryController);

// delete category
router.delete("/delete-category/:id", deleteCategoryController);

export default router