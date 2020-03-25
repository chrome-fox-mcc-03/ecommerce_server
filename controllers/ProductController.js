const { Product } = require('../models')
const { customError } = require("../helpers/errorModel")
const defaultPic = require("../helpers/defaultPic")
let inputParams
let pic
class ProductController {
    static create(req, res, next) {
        console.log('--- PRODUCT CONTROLLER: ADD PRODUCT ---');
        // console.log('SANITY CHECK');
        // console.log(req.body);

        pic = defaultPic(req.body)

        inputParams = {
            name: req.body.name,
            category: req.body.category,
            image_url: pic,
            price: req.body.price,
            stock: req.body.stock
        }
        
        
        Product.create(inputParams)
            .then(response => {
                console.log("NEW PRODUCT HAS BEEN ADDED");
                console.log(response);
                let newProduct = {
                    id: response.id,
                    name: response.name,
                    category: response.category,
                    image_url: response.image_url,
                    price: response.price,
                    stock: response.stock
                }
                console.log("SANITY CHECK BEFORE SENDING");
                console.log(newProduct);
                
                res.status(201).json({data: newProduct})
            })
            .catch(err => {
                console.log("ERROR CREATING NEW PRODUCT");
                next(err)
            })
    }

    static getAll(req, res, next) {
        console.log('--- PRODUCT CONTROLLER: SEE ALL PRODUCTS ---');
        Product.findAll({
            attributes: { exclude: ['CartId', 'UserId'] }
        })
            .then(response => {
                console.log("VIEWING LIST OF PRODUCTS");
                res.status(200).json({data: response})
            })
            .catch(err => {
                console.log("ERROR VIEWING LIST OF PRODUCTS");
                next(err)
            })
    }

    static getById(req, res, next) {
        console.log(">>> FIND TODOS BY ID <<<");
        // console.log(`req decoded is`);
        // console.log(req.decoded);
        // console.log(`payload is`);
        // console.log(req.payload);
        // console.log("REQ PARAMS");
        // console.log(req.params);
        Product.findOne({
                where: {
                    id: +req.params.id
                },
                attributes: { exclude: ['CartId', 'UserId'] }

            })
            .then(response => {
                console.log(`PRODUCT FOUND`);
                console.log(response);
                // console.log(response[0].dataValues);
                if (response) {
                    console.log('PRODUCT FOUND & NOT NULL');
                    res.status(200).json({
                        data: response.dataValues,
                        message: "Entry found",
                        decoded: req.decoded
                    })
                } else {
                    console.log(`PRODUCT NOT FOUND!`);
                    // res.status(404).json({error: "Entry Not Found"})
                    throw new customError(404, "ENTRY NOT FOUND")
                }
            })
            .catch(err => {
                console.log('ERROR FIND ALL PRODUCTS');
                next(err)
            })
    }


    static update(req, res, next) {
        console.log(`>>>> UPDATE PRODUCT BY ID <<<<`);
        console.log(req.params.id);
        // console.log(`checking which user`);
        // console.log(req.decoded);
        console.log(`which payload again?`);
        console.log(req.payload);
        console.log("--- ACHTUNG! REQ.BODY IS ---");
        console.log(req.body);

        pic = defaultPic(req.body)

        inputParams = {
            name: req.body.name,
            category: req.body.category,
            image_url: pic,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update({

                //DEVELOPMENT
                name: inputParams.name,
                category: inputParams.category,
                image_url: pic,
                price: inputParams.price,
                stock: inputParams.stock
            } , {
                where: {
                    id: +req.params.id
                },
                attributes: { exclude: ['CartId'] },
                returning: true
            })
            .then(updated => {
                console.log(`SUCCESS UPDATING PRODUCT:`);
                // console.log(updated);
                if (updated[0] === 0) {
                    console.log("TARGET PRODUCT NOT FOUND");
                    // res.status(404).json({error: "Entry Not Found"})
                    throw new customError(404, "Entry not found")
                } else {
                    console.log("UPDATE SUCCESS");
                    console.log(`SEND UPDATE STATUS`);
                    res.status(200).json({
                        data: updated[1],
                        message: "Entry updated"
                    })
                    
                    //// RESTDB STANDBY
                    // console.log(`entering restdb update`);

                    // restdb.post("/mail", {
                    //     "to": req.decoded.email,
                    //     "subject": "You just added a to-do!",
                    //     "html": 
                    //     `<h2>UPDATED TO-DO:</h2> <br>
                    //      <h3>Title: ${req.body.title}</h3><br>
                    //      <h3>Description: ${req.body.description}</h3><br>
                    //      <h3>Status: ${req.body.email}</h3><br>
                    //      <h3>Due Date: ${req.body.due_date}</h3><br>`,
                    //      "company": "fancyToDoServer",
                    //      "sendername": "Admin"
                    // })

                    // console.log(`RESTDB UPDATE SUCCESS`);

                }
            })
            .catch(err => {
                console.log("ERROR UPDATING PRODUCT");
                next(err)
            })
    }


    static delete(req, res, next) {
        console.log(">>>> DELETE PRODUCT <<<<");
        Product.destroy({
                where: {
                    id: +req.params.id
                },
                attributes: { exclude: ['CartId'] }
            })
            .then(deleted => {
                console.log("DELETE SUCCESS");
                if (deleted === 1) {
                    res.status(200).json({
                        data: deleted,
                        message: "Delete Success"
                    })
                } else {
                    console.log("PRODUCT NOT FOUND TO DELETE");
                    throw new customError(404, "ENTRY NOT FOUND")
                }
            })
            .catch(err => {
                console.log("ERROR DELETEING PRODUCT");
                next(err)
            })
    }
}

module.exports = ProductController