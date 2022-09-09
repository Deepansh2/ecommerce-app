/**
 * This file will have the db related configs
 */

module.exports = {
    HOST : "localhost",
    USER : "root",
    PASSWORD : "deepanshu@123",
    DB : "ecom_db",
    dialect : "mysql",
    pool : {
        max : 5,// Maximum connection possible at any time = 5 at peak load
        min : 0,
        acquire : 30000,// In ms wait for 30000 ms before aborting a connection request
        idle : 1000
    }
}