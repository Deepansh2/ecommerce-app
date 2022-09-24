const cartController = require("../controllers/cart.controller");
const {authJwt} = require('../middlewares')

module.exports = (app) =>{

    app.post("/ecommerce/api/v1/carts",[authJwt.verifyToken],cartController.create);
    app.put("/ecommerce/api/v1/carts/:id",[authJwt.verifyToken],cartController.update);
    app.get("/ecommerce/api/v1/carts/:id",[authJwt.verifyToken],cartController.getCart)
}