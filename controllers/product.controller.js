const { category } = require('../models');
const db = require('../models');
const Product = db.product 


exports.create = (req,res) =>{

    const productObj = {

        name : req.body.name,
        description : req.body.description,
        cost : req.body.cost,
        categoryId : req.body.categoryId
    }
    Product.create(productObj).then(productCreated =>{
        res.status(201).send({
            message : `New Product created ${productCreated.name}`
        })
    }).catch(err=>{
        console.log("Error while creating product",err.message);
        res.status(500).send({
            message  : "Some internal server error happened"
        })
    })
}

exports.findAll = (req,res) =>{

    const productName = req.query.name
    var promise;
    if(productName){
        promise = Product.findAll({
            where : {
                name : productName
            }
        })
    }else{
        promise = Product.findAll()
    }
    promise.then(products =>{
        res.status(200).send(products)
    }).catch(err=>{
        console.log("Error while finding all Product",err.message);
        res.status(500).send({
            message : "Some internal server happened"
        })
    })
}


exports.findOne = (req,res) =>{

    const productId = req.params.id

    Product.findByPk(productId).then(productId =>{
        res.status(200).send(productId);
    }).catch(err=>{
        console.log("Error while finding req. Id",err.message);
        res.status(500).send({
            message : "Some internal server error happened"
        })
    })
}


exports.update = (req,res) =>{

    const productObj = {
        name : req.body.name,
        description : req.body.description,
        cost : req.body.cost
    }

    const productId = req.params.id

    Product.update(
        productObj,{
            returning : true,
            where : {
                id : productId
            }
        }       
    ).then(productUpdated=>{
        Product.findByPk(productId).then(productRes =>{
            res.status(200).send(productRes);
        }).catch(err=>{
            res.status(500).send({
                message  : "Some internal server error happened" || err.message
            })
        })
    }).catch(err=>{
        console.log(`Error while updating product ${productObj.name}`,err.message)
        res.status(500).send({
            message : "Internal server error"
        })
    })
}

exports.delete = (req,res) =>{

    const productId = req.params.id;
    Product.destroy({
        where : {id : productId}
    }).then(result=>{
        res.status(200).send({
            message : "successfully Delete the id",result
        });
    }).catch(err=>{
        res.status(500).send({
            message : "Some internal server error happened"
        })
    })
}