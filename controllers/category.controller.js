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

    Category.findAll().then(categories =>{
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