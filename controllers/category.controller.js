/**
 * This file is the controller aka the waiter in the hotel
 * 
 * this file will have all the logic that is needed for the processing of the request
 */


/**
 * Handler for create a new category request
 */
const db = require('../models');
const Category = db.category;

exports.create  = (req,res) =>{

    const category = {
        name : req.body.name,
        description : req.body.description
    }
    Category.create(category).then(category =>{
        console.log(`category name : [${category.name}] got inserted into the db`);
        res.status(201).send(category);
    }).catch(err=>{
        console.log(`Issue in inserting the category name :[${category.name}] error message [${err.message}]`);
        res.status(500).send({
            message : "Some internal server error happened"
        })
    })
}


exports.findAll = (req,res) =>{

    /**
     * I need to intercept the query params and use it : ?name=Deepanshu
     */
    const categoryName = req.query.name; // will get deepanshu stored in categoryName

    /**
     * If i get a query param , which is name, I should apply the name filter
     * else, no filter
     */
    let promise;
    if(categoryName){
        promise = Category.findAll({
            where : {
                name : categoryName
            }
        })
    }else {
        promise = Category.findAll()
    }

    promise.then(categories =>{
        res.status(200).send(categories);
    }).catch(err =>{
        res.status(500).send({
            message : "Some internal server happened"
        })
    })
}

exports.findOne = (req,res) =>{
    const categoryId = req.params.id;
    Category.findByPk(categoryId).then(categoryId=>{
        res.status(200).send(categoryId)
    }).catch(err=>{
        res.status(500).send({
            message : "Some internal server happened"
        })
    })
}

exports.updateCategory = (req,res) =>{

    /**
     * I need to parse the request body, just like POST
     */
    const category = {
        name : req.body.name,
        description : req.body.description
    }

    const categoryId = req.params.id;

    Category.update(category,{
        where : {id : categoryId},
        returning : true
    }).then(updatedCategory => {

        Category.findByPk(categoryId).then(categoryRes =>{
            res.status(200).send(categoryRes);
        }).catch(err=>{
            res.status(500).send({
                message : "Some internal server error happened"
            })
        })

    }).catch(err=>{
        console.log(`err while updating the category ${category.name}`,err.message)
    })
}


exports.delete = (req,res) =>{

    const categoryId = req.params.id;
    Category.destroy({
        where : {
            id : categoryId
        }
    }).then(result =>{
        res.status(200).send({
            messsage : "Successfully delete the id"
        })
    }).catch(err=>{
        res.status(500).send({
            message : "Some Internal server happened"
        })
    })
}