 const categoryController = require("../controllers/category.controller");

 
 module.exports = function(app){

    app.post("/ecommerce/api/v1/categories",categoryController.create);
    app.get("/ecommerce/api/v1/categories",categoryController.findAll);
    app.get("/ecommerce/api/v1/categories/:id",categoryController.findOne)
 }