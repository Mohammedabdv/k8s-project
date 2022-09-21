const Product = require("../models/product");
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

//----Documenation----
//https://npmjs.com/package/express
//https://npmjs.com/package/formidable
//https://npmjs.com/package/lodash
//https://npmjs.com/package/fs

//----Exports----

//Get product by id
exports.getProductById = (req, res, next, id) => {
    //Find product by id
    Product.findById(id).exec((err, product) => {
        //if error or product not found
        if (err) {
            return res.status(400).json({
                error: "Product not found in DB"
            });
        }
        //if product found, set product to req.product
        req.product = product;
        next();
    });
};

//Create product
exports.createProduct = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    //Parse form data
    form.parse(req, (err, fields, file) => {
        //if error
        if (err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }
        //Destructure fields
        const { name, description, price, category, stock } = fields;
        //if any field is empty
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ) {
            return res.status(400).json({
                error: "Please include all fields"
            });
        }
        const product = new Product(fields)
        //handle file here
        if (file.photo) {
            //check if file size is greater than 2mb
            if (file.photo.size > 2 * 1024 * 1024) {
                return res.status(400).json({
                    error: "File size too big"
                });
            }
            //set product photo to file
            product.photo.data = fs.readFileSync(file.photo.path);
            //set product photo type to file type
            product.photo.contentType = file.photo.type;
        };
        //save product to DB
        product.save((err, product) => {
            //if error
            if (err) {
                res.status(400).json({
                    error: "Saving tshirt in DB failed"
                })
            }
            //send product to frontend
            res.json(product);
        });
    });
};

//Get product
exports.getProduct = (req, res) => {
    //Do not send photo data to frontend
    req.product.photo = undefined;
    //send product to frontend
    return res.json(req.product);
};

//Middleware

//Get photo
exports.photo = (req, res, next) => {
    //if photo exists
    if (req.product.photo.data) {
        //set content type to photo type
        res.set("Content-Type", req.product.photo.contentType);
        //send photo data to frontend
        return res.send(req.product.photo.data);
    }
    next();
};

//Update product
exports.updateProduct = (req, res) => {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    //Parse form data
    form.parse(req, (err, fields, file) => {
        //if error
        if (err) {
            return res.status(400).json({
                error: "Problem with image"
            });
        }
        //Update product
        let product = req.product;
        //Update product with fields
        product = _.extend(product, fields);
        //handle file here
        if (file.photo) {
            //check if file size is greater than 2mb
            if (file.photo.size > 2 * 1024 * 1024) {
                return res.status(400).json({
                    error: "File size too big"
                });
            }
            //set product photo to file
            product.photo.data = fs.readFileSync(file.photo.path);
            //set product photo type to file type
            product.photo.contentType = file.photo.type;
        };
        //save product to DB
        product.save((err, product) => {
            //if error
            if (err) {
                res.status(400).json({
                    error: "Updation of product failed"
                })
            }
            //send product to frontend
            res.json(product);
        });
    });
};

//Delete product
exports.deleteProduct = (req, res) => {
    //Get product
    let product = req.product;
    //Delete product
    product.remove((err, deletedProduct) => {
        //if error
        if (err) {
            return res.status(400).json({
                error: "Failed to delete the product"
            });
        }
        //send deleted product to frontend
        res.json({
            message: "Deletion was a success",
            deletedProduct
        });
    });
};

//Listing products
exports.getAllProducts = (req, res) => {
    //Get limit and sortBy from query
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    //Find all products
    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, products) => {
            //if error
            if (err) {
                return res.status(400).json({
                    error: "No products found"
                });
            }
            //send products to frontend
            res.json(products);
        });
}

//Get all unique categories
exports.getAllUniqueCategories = (req, res) => {
    //Find all products
    Product.distinct("category", {}, (err, category) => {
        //if error
        if (err) {
            return res.status(400).json({
                error: "No category found"
            });
        }
        //send categories to frontend
        res.json(category);
    });
};

//Update stock
exports.updateStock = (req, res, next) => {
    //Get operations from req.body
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: { $inc: { stock: -prod.count, sold: +prod.count } }
            }
        };
    });
    //Update stock
    Product.bulkWrite(myOperations, {}, (err, products) => {
        //if error
        if (err) {
            return res.status(400).json({
                error: "Bulk operation failed"
            });
        }
        next();
    });
}