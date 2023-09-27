import slugify from "slugify";
import productModel from "../model/productModel.js"
import orederModel from "../model/orederModel.js";
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

// paymenr getway

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// create product controller

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        // validation

        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Require" });
            case !description:
                return res.status(500).send({ error: "description is Require" });
            case !price:
                return res.status(500).send({ error: "price is Require" });
            case !category:
                return res.status(500).send({ error: "category is Require" });
            case !quantity:
                return res.status(500).send({ error: "quantity is Require" });
            case !image && image.size > 8000000:
                return res.status(500).send({ error: "image is Require" });

        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (image) {
            products.image.data = fs.readFileSync(image.path)
            products.image.contentType = image.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating Product"
        })
    }
};

// get product controller

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate("category").select("-image").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "All Products",
            total_Products: products.length,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting Product",
            error
        })
    }
};

// get single product controller

export const getSingleProductController = async (req, res) => {
    try {
        const products = await productModel.findOne({ slug: req.params.slug }).select("-image").populate("category")
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting single Product",
            error
        })
    }
};

// get product image controller

export const productImageController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("image")
        if (product.image.data) {
            res.set('Content-type', product.image.contentType);
            return res.status(200).send(product.image.data);
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting image",
            error
        })
    }
};

// delete Product Controller

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-image");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in deleting product",
            error
        })
    }
}


export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files;

        // validation

        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Require" });
            case !description:
                return res.status(500).send({ error: "description is Require" });
            case !price:
                return res.status(500).send({ error: "price is Require" });
            case !category:
                return res.status(500).send({ error: "category is Require" });
            case !quantity:
                return res.status(500).send({ error: "quantity is Require" });
            case !image && image.size > 8000000:
                return res.status(500).send({ error: "image is Require" });

        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) }, { new: true }
        )
        if (image) {
            products.image.data = fs.readFileSync(image.path)
            products.image.contentType = image.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating Product"
        })
    }
}

// filters

export const filterProductController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked;
        if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error While Filtering Products",
            error
        })
    }
}

// product count controller

export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in product count",
            error
        })
    }
}

// product list controller

export const productListController = async (req, res) => {
    try {
        const perPage = 2
        const page = req.params.page ? req.params.page : 1
        const products = await productModel
            .find({})
            .select("-image")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 })

        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in product list page",
            error
        })
    }
}

// search product controller

export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-image")
        res.json(results)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: true,
            message: "Error in Search Product",
            error
        })
    }
}

//payment getway
//token
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

//payment
export const braintreePaymentController = async (req, res) => {
    // let items = JSON.parse(localStorage.getItem("deleted_items"));
    // console.log(items)
    try {
        const { cart, nonce,ID} = req.body
        let total = 0;
        cart.map((i) => {
            total += i.price
        });
        let newTransaction = gateway.transaction.sale({ 
            amount : total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true
            }
        }, 
        function(error, result){
            if(result){
                const order = new orederModel({
                    products:cart,
                    payment:result,
                    user_id:ID
                }).save()
                console.log(result)
                res.json({ok:true})
            }else{
                res.status(500).send(error)
            }
        }
        )
    } catch (error) {
        console.log(error)
    }
}

// order status
export const orderStatusController =async (req,res) => {
    try {
        const {orderId} = req.params
        const {status} = req.body
        const order = await orederModel.findByIdAndUpdate(orderId, {status}, {new:true})
        res.json(order)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message:"Error in update status",
            error
        })
    }
}

