
const authController = require("../controllers/auth.controller");
const {verifySignUp} = require('../middlewares')

module.exports = (app) =>{

    app.post("/ecommerce/api/v1/auth/signup",[verifySignUp.checkDuplicateUserNameOrEmail,verifySignUp.validateRole],authController.signup);

    app.post("/ecommerce/api/v1/auth/signin",authController.signin)
    

}