const db = require("../models")

const bcrypt = require('bcryptjs');
const authConfig = require('../configs/secret.config')


const User = db.user
const Role = db.role
const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');



exports.signup = (req, res) => {
    console.log("req.body.name", req.body.name);
    console.log("req.body.email", req.body.email);
    console.log("req.body.password", req.body.password)

    const userObj = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }


    User.create(userObj).then(user => {

        console.log("user created")
        //I also need to provide correct roles to this
        if (req.body.roles) {
            //I need to first have the Roles created in the system

            //I need to check if the desired roles  match with the supported roles;
            Role.findAll({
                where: {
                    name: {
                        // Where name = "deepanshu" or integer = 2 or name = 3
                        [Op.or]: req.body.roles // array of roles
                    }
                }
            }).then(roles => {
                console.log("roles", roles);

                user.setRoles(roles).then(() => {
                    console.log(`>>> new user ${user.name} registration completed <<<`);
                    return res.status(201).send({
                        message: "User successfully registered"
                    })
                })
            })
        } else {
            //One option is that i fetch the role object by running the query
            /**  Role.findOne({
                 where : {
                     name : "customer"
                 }
             }).then(roles =>{
                 userCreated.setRoles([roles]).then(()=>{
                     console.log("Registration completed");
                     return res.status(201).send({
                         message : "User successfully registerd"
                     })
                 })
             })*/
            //Second option is we are already aware of id of customer 
            user.setRoles([1]).then(() => {
                console.log("Registration completed");
                return res.status(201).send({
                    message: "User registerd successfully"
                })
            })
        }

    }).catch(err => {
        console.log("Error while creating user", err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    })

}



exports.signin = (req, res) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found"
            })
        }

        var isValidPassword = bcrypt.compareSync(req.body.password, user.password);

        if (!isValidPassword) {
            return res.status(401).send({
                message: "Invalid Password"
            })
        }

        var token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 600 });
        console.log(`>>>  ${user.name} logged in  <<<<`) // 600 could have been in config file


        /**
 * I want to provide the roles assigned to user in the response
 */
        var authorities = [];
        user.getRoles().then(roles => {

            for (i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase())
            }

            res.status(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        });

    }).catch(err=>{
        return res.status(500).send({
            message : "Some internal server error" && err.message
        })
    })

}   