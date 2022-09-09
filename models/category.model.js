/**
 * 
 * This file will contain the schema definition for 
 * the Category resource 
 * 
 * we would to export this schema to be called from other modules
 * 
 */


module.exports = (sequelize,Sequelize) =>{

    const Category = sequelize.define("category",{
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type  : Sequelize.STRING,
            allownull : false
        },
        description : {
            type : Sequelize.STRING
        }
    },{
        tableName : "categories" //customize name you can give it instead of category
    })

    return Category;
} 