/**
 * This file will consists of middlewares for validating the request body
 */


const {category} = require('../models')

/**
 * Validate the request body for categories
 */

const validateCategoryRequest = (req,res,next) =>{

    if(!req.body.name){
        return res.status(400).send({
            message : "Name of the category is not provided"
        })
    }

    if(!req.body.description){
        return res.status(400).send({
            message : "Description of the category is not provided"
        })
    }
    
    next();
}

const validateProductRequest = (req,res,next) =>{

    if(!req.body.name){
        return res.status(400).send({
            message : "Product name is not provided"
        })
    }
    
    if(!req.body.description){
        return res.status(400).send({
            message : "Description of product is not provided"
        })
    }

    if(!req.body.cost && !req.body.cost>=0){
        return res.status(400).send({
            message  : "Cost of the product is not seem to be place"
        })
    }

    if(!req.body.categoryId){
        return res.status(400).send({
            message : "categoryId is not provided"
        })
    } else if(req.body.categoryId){
        category.findByPk(req.body.categoryId).then(category=>{
            if(!category){
                return res.status(400).send({
                    message : "CategoryId is not found"
                })
            }
        })
    }
    next()
}

module.exports = {
    validateCategoryRequest:validateCategoryRequest,
    validateProductRequest : validateProductRequest
}

