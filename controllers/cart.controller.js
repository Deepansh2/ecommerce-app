

const db = require('../models');
const Cart = db.cart;
const Product = db.product;

exports.create = (req, res) => {

    const cartObj = {
        userId: req.userId
    }

    //If user has also provided the item ids while creating cart
    // const itemId = req.body.items ;

    Cart.create(cartObj).then(cart => {
        console.log(` >>>>> cart got created <<<<<<`);
        res.status(201).send(cart)
    }).catch(err => {
        console.log("Error happened while creating cart", err.message);
        return res.status(500).send({
            message: "Some internal server error"
        })
    })
}

exports.update = (req, res) => {
    //Figure out of the cart if it's present , which needs to be updated

    const cartId = req.params.id;
    Cart.findByPk(cartId).then(cart => {
        // Add the products passed in the request body to the cart
        var productIds = req.body.productIds;

        Product.findAll({
            where: {
                id: productIds
            }
        }).then(products => {
            if (!products) {
                return res.status(400).send({
                    message: "Products trying to add doesn't exist"
                })
            }
            //Set these products inside the Cart
            cart.setProducts(products).then(() => {
                console.log("Products successfully added to the cart");
                // take care of cost part
                var cost = 0;
                var productsSelected = [];
                cart.getProducts().then(cartProducts => {

                    for (let i = 0; i < cartProducts.length; i++) {
                        productsSelected.push({
                            id: cartProducts[i].id,
                            name: cartProducts[i].name,
                            cost: cartProducts[i].cost,
                        });
                        cost = cost + cartProducts[i].cost;
                    }
                    // return the cart update response
                    return res.status(200).send({
                        id: cart.id,
                        productsSelected: productsSelected,
                        cost: cost
                    })

                })
            })
        })
    }).catch(err => {
        return res.status(500).send({
            message: "Error happened while updating the cart"
        })
    })
}


exports.getCart = (req, res) => {

    const cartId = req.params.id
    Cart.findByPk(cartId).then(cart => {
        var cost = 0;
        var productsSelected = [];
        cart.getProducts().then(cartProducts => {

            for (let i = 0; i < cartProducts.length; i++) {
                productsSelected.push({
                    id: cartProducts[i].id,
                    name: cartProducts[i].name,
                    cost: cartProducts[i].cost
                });
                cost = cost + cartProducts[i].cost;
            }
            res.status(200).send({
                id: cart.id,
                productsSelected: productsSelected,
                cost: cost
            })
        })
    })
}