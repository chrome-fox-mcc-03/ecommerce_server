const { Product } = require('../models')

class ProductController {
    static create(req, res, next) {
        console.log('--- PRODUCT CONTROLLER: ADD PRODUCT ---');

        // // DEVELOPMENT
        // console.log("REQ BODY IS:");
        // console.log(req.body);

        // //TESTING
        // console.log("REQ BODY DATA IS");
        // console.log(req.body.data);
        // console.log(req.body.data.name);
        
        // Product.create(req.body.data) //TESTING
        Product.create(req.body)
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
        Product.findAll()
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
        console.log(`req decoded is`);
        console.log(req.decoded);
        // console.log(`payload is`);
        // console.log(req.payload);
        console.log("REQ PARAMS");
        console.log(req.params);
        Product.findAll({
                where: {
                    id: +req.params.id
                }
            })
            .then(response => {
                console.log(`RECOVERED TODO: `);
                console.log(response[0].dataValues);
                if (response) {
                    res.status(200).json({
                        data: response[0].dataValues,
                        message: "Entry found",
                        decoded: req.decoded
                    })
                } else {
                    console.log(`BAD MOVE! NOT FOUND!`);
                    // res.status(404).json({error: "Entry Not Found"})
                    throw new customError(404, "ENTRY NOT FOUND")
                }
            })
            .catch(err => {
                next(err)
            })
    }


    static update(req, res, next) {
        console.log(`>>>> UPDATE PRODUCT BY ID <<<<`);
        console.log(req.params.id);
        console.log(`checking which user`);
        console.log(req.decoded);
        // console.log(`which payload again?`);
        // console.log(req.payload);
        console.log("--- ACHTUNG! REQ.BODY IS ---");
        console.log(req.body);
        Product.update({

                // // TESTING
                // title: req.body.data.title,
                // category: req.body.data.category,
                // image_url: req.body.data.image_url,
                // price:req.body.data.price,
                // stock: req.body.data.stock

                //DEVELOPMENT
                title: req.body.title,
                category: req.body.category,
                image_url: req.body.image_url,
                price:req.body.price,
                stock: req.body.stock
            }, {
                where: {
                    id: +req.params.id
                },
                returning: true
            })
            .then(updated => {
                console.log(`UPDATED DATUM IS:`);
                console.log(updated);
                if (updated[0] === 0) {
                    // res.status(404).json({error: "Entry Not Found"})
                    throw new customError(404, "Entry not found")
                } else {
                    console.log("UPDATE SUCCESS");
                    console.log(`SEND UPDATE STATUS`);
                    res.status(200).json({
                        data: updated[1],
                        message: "Entry updated"
                    })

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
                next(err)
            })
    }


    static delete(req, res, next) {
        console.log(">>>> DELETE PRODUCT <<<<");
        Product.destroy({
                where: {
                    id: +req.params.id
                }
            })
            .then(deleted => {
                console.log("DELETE SUCCESS");
                if (deleted === 1) {
                    res.status(200).json({
                        data: deleted,
                        message: "Delete Success"
                    })
                } else {
                    throw new customError(404, "ENTRY NOT FOUND")
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController