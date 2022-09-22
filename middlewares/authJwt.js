/**
 * Logic to validate the access token
 */
const jwt = require('jsonwebtoken')
const authConfig = require('../configs/secret.config')
const db = require('../models');
const User = db.user

const verifyToken =  (req,res,next) =>{

    const token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({
            message : "Access denied no token is provided"
        })
    }

    jwt.verify(token,authConfig.secret,(err,decoded)=>{

        if(err){
            return res.status(401).send({
                message : "Failed! token is not valid"
            })
        }
        req.userId = decoded.id // Reading the user from the token and setting it into request object
        next();
    })
}

const isAdmin = (req,res,next) =>{

    // In the previous middleware we got the userId
    
    //Using that userId I will fetch the user Object from db and check the userType
    User.findByPk(req.userId).then(user =>{
        user.getRoles().then(roles =>{
            for(let i=0;i<roles.length;i++){
                if(roles[i].name == 'admin'){
                    next();
                    return
                }
            }
            return res.status(403).send({
                message : "Require ADMIN Role"
            })
        })
    })
}


const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin
}
module.exports = authJwt