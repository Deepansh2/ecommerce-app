 const categoryController = require("../controllers/category.controller");
const {bodyValidator,authJwt} = require('../middlewares')
 
 module.exports = function(app){

    app.post("/ecommerce/api/v1/categories",[authJwt.verifyToken,bodyValidator.validateCategoryRequest,authJwt.isAdmin],categoryController.create);
    app.get("/ecommerce/api/v1/categories",categoryController.findAll);
    app.get("/ecommerce/api/v1/categories/:id",categoryController.findOne);
    app.put("/ecommerce/api/v1/categories/:id",[authJwt.verifyToken,authJwt.isAdmin,bodyValidator.validateCategoryRequest],categoryController.updateCategory);
    app.delete("/ecommerce/api/v1/categories/:id",[authJwt.verifyToken,authJwt.isAdmin],categoryController.delete)
 }