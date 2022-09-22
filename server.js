const express = require("express");
const app =  express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())

/**
 * Code for the table initialization 
 */
const db = require('./models');
const Category = db.category;
const Product = db.product;
const Role = db.role

console.log(Category)

/**
 * Setup the relationship between the tables
 */

Category.hasMany(Product); // 1 to many relationship

/**
 * Create the table
 */
db.sequelize.sync({force : true}).then(() =>{
    console.log("Table dropped and recreated");
    init()
}).catch(err=>{
    console.log(err.message);
})

/**
 * This function should be executed at the begining of the app startup
 */

function init(){

    /**
     * Create some intial categoires
     * 
     * bulk insert in Sequelize
     */
    var categories = [
        {
            name : "Electronics",
            description : "This will contain all the electronics products "
        },

        {
            name : "KitchenItems",
            description : "This category will contain all the kitchen products"
        }
    ];

    Category.bulkCreate(categories).then(()=>{
        console.log("Categories are added")
    }).catch(err=>{
        console.log("Error in initializing the categories",err.message)
    })
/**
 * creating the roles
 */
    Role.create({
        id:1,
        name : "customer",
    });

    Role.create({
        id : 2,
        name : "admin"
    })

}


//Initialize the routes
require("./routes/category.route")(app);
require('./routes/product.route')(app);
require('./routes/auth.route')(app);

const serverConfig = require('./configs/server.config');

app.listen(serverConfig.PORT,()=>{
    console.log("Application is running on PORT :",serverConfig.PORT);
})



/** 
function isValidObjectId(id){

    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;                      need to see how this is woriking
    }
    return false;
}
*/