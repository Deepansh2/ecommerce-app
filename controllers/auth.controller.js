const db = require("../models")

const bcrypt = require('bcryptjs');


const User = db.user
const Role = db.role
const Op = db.Sequelize.Op;


exports.signup = (req,res) =>{
    console.log("req.body.name",req.body.name);
    console.log("req.body.email",req.body.email);
    console.log("req.body.password",req.body.password)

    const userObj = {
        name : req.body.name,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8)
    }


    User.create(userObj).then(user =>{

        console.log("user created")
        //I also need to provide correct roles to this
        if(req.body.roles){
            //I need to first have the Roles created in the system

            //I need to check if the desired roles  match with the supported roles;
            Role.findAll({
                where : {
                    name : {
                        // Where name = "deepanshu" or interger = 2 or name = 3
                        [Op.or]: req.body.roles // array of roles
                    }
                }
            }).then(roles=>{
                console.log("roles",roles);
                
                user.setRoles(roles).then(()=>{
                    console.log("registeration completed");
                    return res.status(201).send({
                        message: "User successfully registerd"
                    })
                })
            })
        }else{
            //One option is that i fetch the role object by runing the query
           /**  Role.findOne({
                where : {
                    name : "customer"
                }
            }).then(roles =>{
                userCreated.setRoles([roles]).then(()=>{
                    console.log("Registeration completed");
                    return res.status(201).send({
                        message : "User successfully registerd"
                    })
                })
            })*/
            //Second option is we are already aware of id of customer 
            user.setRoles([1]).then(()=>{
                console.log("Registeration completed");
                return res.status(201).send({
                    message : "User registerd successfully"
                })
            })
        }

    }).catch(err=>{
        console.log("Error while creating user",err.message);
        return res.status(500).send({
            message : "Some internal error"
        })
    })

}
