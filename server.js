const express = require("express");
const app =  express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())

/**
 * Code for the table initialization 
 */
const db = require('./models');
const Category = db.category;

console.log(Category)

/**
 * Create the table
 */
db.sequelize.sync({force : true}).then(() =>{
    console.log("Table dropped and recreated");
}).catch(err=>{
    console.log(err.message);
})


//Initialize the routes
require("./routes/category.route")(app);
require('./routes/product.route')(app)

const serverConfig = require('./configs/server.config')
app.listen(serverConfig.PORT,()=>{
    console.log("Application is runing on PORT :",serverConfig.PORT);
})