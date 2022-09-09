

module.exports = (sequelize,Sequelize) =>{

    const Product = sequelize.define("product",{
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        name : {
            type : Sequelize.STRING,
            allownull : false
        },
        description : {
            type : Sequelize.STRING,
            allownull : false
        },
        cost : {
            type : Sequelize.INTEGER,
            allownull : false
        }
    });
    return Product;
}