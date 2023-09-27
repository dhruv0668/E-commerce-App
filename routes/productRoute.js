import  express  from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { braintreePaymentController, braintreeTokenController, createProductController, 
        deleteProductController, 
        filterProductController, 
        getProductController, 
        getSingleProductController, 
        orderStatusController, 
        productCountController, 
        productImageController, 
        productListController, 
        searchProductController, 
        updateProductController,
        } from "../controller/productController.js";
import formidable from "express-formidable";


//router object
const router = express.Router();

// create product
router.post("/create-product", formidable(), createProductController);

// get product
router.get("/get-product", getProductController)

// get single product
router.get("/get-product/:slug", getSingleProductController);

// get image
router.get("/product-image/:pid", productImageController);


// delete product
router.delete("/delete-product/:pid", deleteProductController);


// update product
router.put("/update-product/:pid", formidable(), updateProductController);

//filter product
router.post("/filter-product", filterProductController)   

// product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

// search 
router.get("/search/:keyword", searchProductController)

// payment getway
// token
router.get("/braintree/token", braintreeTokenController)

//payment
router.post("/braintree/payment", braintreePaymentController)

// order status
router.put("/order-status/:orderId", orderStatusController)

export default router