const Category = require("../models/category");

//----Exports----

//Get category by id
exports.getCategoryById = (req, res, next, id) => {
    //Find category by id
    Category.findById(id).exec((err, category) => {
        //if error or category not found
        if (err || !category) {
            return res.status(400).json({
                error: "Category not found in DB"
            });
        }
        //if category found, set category to req.category
        req.category = category;
        next();
    });
};

//Create category
exports.createCategory = (req, res) => {
    //Save category to DB
    const category = new Category(req.body);
    category.save((err, category) => {
        //if error
        if (err) {
            return res.status(400).json({
                error: "Not able to save category in DB"
            });
        }
        //send category to frontend
        res.json(`${category.name} category created`);
    });
};

//Get category
exports.getCategory = (req, res) => {
    //send category to frontend
    return res.json(req.category);
};

//Get all categories
exports.getAllCategory = (req, res) => {
    //Find all categories
    Category.find().exec((err, categories) => {
        //if error
        if (err) {
            return res.status(400).json({
                error: "No categories found"
            });
        }
        //send categories to frontend
        res.json(categories)
    });
};

//Update category
exports.updateCategory = (req, res) => {
    const category = req.category;
    const old = category.name;
    category.name = req.body.name;
    //Save category to DB
    category.save((err, updatedCategory) => {
        //if error
        if (err) {
            return res.status(400).json({
                error: "Failed to update category ${old}"
            });
        }
        //send category to frontend
        res.json({
            message: `updated category from ${old} to ${category.name}`
        }
        );
    });
};

//Delete category
exports.removeCategory = (req, res) => {
    const category = req.category;
    const removedCategory = category.name
    //Delete category from DB
    category.remove((err, category) => {
        //if error
        if (err) {
            return res.status(400).json({
                error: "Failed to delete this category"
            });
        }
        //send category to frontend
        res.json({
            message: `Successfully deleted category: ${removedCategory}`
        });
    });
};

