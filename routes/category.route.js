 const categoryController = require("../controllers/category.controller");
const {bodyValidator} = require('../middlewares')
 
 module.exports = function(app){

    app.post("/ecommerce/api/v1/categories",[bodyValidator.validateCategoryRequest],categoryController.create);
    app.get("/ecommerce/api/v1/categories",categoryController.findAll);
    app.get("/ecommerce/api/v1/categories/:id",categoryController.findOne);
    app.put("/ecommerce/api/v1/categories/:id",categoryController.updateCategory);
    app.delete("/ecommerce/api/v1/categories/:id",categoryController.delete)
 }