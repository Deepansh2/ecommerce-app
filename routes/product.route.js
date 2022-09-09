const productController = require('../controllers/product.controller')

module.exports = function(app){

    app.post("/ecommerce/api/v1/products",productController.create);
    app.get("/ecommerce/api/v1/products",productController.findAll);
    app.get("/ecommerce/api/v1/products/:id",productController.findOne);
    app.put("/ecommerce/api/v1/products/:id",productController.update);
    app.delete("/ecommerce/api/v1/products/:id",productController.delete)
}