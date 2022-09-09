const db = require('../models');
const Product = db.product 


exports.create = (req,res) =>{

    const productObj = {

        name : req.body.name,
        description : req.body.description,
        cost : req.body.cost
    }
    Product.create(productObj).then(productCreated =>{
        res.status(201).send({
            message : `New Product created ${productCreated}`
        })
    }).catch(err=>{
        console.log("Error while creating product",err.message);
        res.status(500).send({
            message  : "Some internal server error happened"
        })
    })
}

exports.findAll = (req,res) =>{

    Product.findAll().then(products =>{
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

    Product.update(productObj,{
        where : {id : productId},
        returning : true
    }).then(productUpdated=>{
        productObj.findByPk(productId).then(productRes =>{
            res.status(200).send(productRes);
        }).catch(err=>{
            res.status(500).send({
                message  : "Some internal server error happened" || err.message
            })
        })
    }).catch(err=>{
        console.log(`Error while updating product ${productObj.name}`,err.message)
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