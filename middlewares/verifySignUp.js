/**
 * Validation for the duplicate email or name
 */

const db = require("../models");
const User = db.user
const ROLES = db.ROLES



const checkDuplicateUserNameOrEmail = (req, res, next) => {

    User.findOne({
        where: {
            name: req.body.name
        }
    }).then(user => {
        if (user) {
            return res.status(400).send({
                message: "Failed ! User already exist"
            })
        }

        //If user is valid, then also validate email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                return res.status(400).send({
                    message: "Failed ! Email is already present"
                })
            }
            next();
        })
    });


}


/**
 * Validation for correct roles
 */
const validateRole =  (req,res,next) =>{

    if(req.body.roles){

        for(let i = 0 ;i<req.body.roles.length ; i++){

            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).send({
                    message : "Failed ! Role doesn't exist" + req.body.roles[i]
                })
            }
        }
    }
    next();
}


/**
 * Validate if the  name and email is valid
 */


const verifySignUp = {

    checkDuplicateUserNameOrEmail: checkDuplicateUserNameOrEmail,
    validateRole : validateRole
}

module.exports = verifySignUp