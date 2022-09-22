const bodyValidator = require('./reqBody.validator');
const verifySignUp = require('./verifySignUp');
const authJwt = require('./authJwt')

module.exports = {
    bodyValidator,
    verifySignUp,
    authJwt
}