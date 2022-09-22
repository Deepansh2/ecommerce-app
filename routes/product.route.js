const productController = require('../controllers/product.controller')
const {bodyValidator,authJwt} = require('../middlewares')

module.exports = function(app){

    app.post("/ecommerce/api/v1/products",[authJwt.verifyToken,authJwt.isAdmin,bodyValidator.validateProductRequest],productController.create);
    app.get("/ecommerce/api/v1/products",productController.findAll);
    app.get("/ecommerce/api/v1/products/:id",productController.findOne);
    app.put("/ecommerce/api/v1/products/:id",[authJwt.verifyToken,authJwt.isAdmin,bodyValidator.validateProductRequest],productController.update);
    app.delete("/ecommerce/api/v1/products/:id",[authJwt.verifyToken,authJwt.isAdmin],productController.delete)
}