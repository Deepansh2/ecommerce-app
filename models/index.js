/**
 * This file will expose the functionalities of all the model files define under
 * the models directory
 */

// create the connection with the db

const Sequelize = require('sequelize');
const config = require("../configs/db.config");



/**
 * creating the db connection
 */

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host : config.HOST,
        dialect : config.dialect,
        pool : {
            max : config.pool.max,
            min : config.pool.min,
            acquire : config.pool.acquire,
            idle : config.pool.idle
        }
    }
);

/**
 * I need to expose the sequelize and category model
 */

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.category = require('./category.model')(sequelize,Sequelize);
db.product = require('./product.model')(sequelize,Sequelize);
db.user = require('./user.model')(sequelize,Sequelize);
db.role = require('./role.model')(sequelize,Sequelize);
db.cart = require('./cart.model')(sequelize,Sequelize);


/**
 * Many to Many relationship
 */

db.role.belongsToMany(db.user , {
    through : "user_roles",
    foreignKey : "role_id",
    otherKey  : "user_id"
})

db.user.belongsToMany(db.role, {
    through : "user_roles",
    foreignKey : "user_id",
    otherKey : "role_id"
})

/**
 * Establish the relation between 
 * 1. user and cart : One to many
 * 2. Cart and the product : Many to Many
 */
db.user.hasMany(db.cart);

db.product.belongsToMany(db.cart,{
    through : "cart_products",
    foreignKey : "productId",
    otherKey : "cartId"
})
db.cart.belongsToMany(db.product,{
    through : "cart_products",
    foreignKey : "cartId",
    otherKey : "productId"
})



// === LIST OF VALID ROLES
db.ROLES = ['customer','admin']

module.exports = db;  