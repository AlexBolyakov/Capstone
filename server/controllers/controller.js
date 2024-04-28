
require("dotenv").config();
const{CONNECTION_STRING} = process.env;
const {Sequelize} = require("sequelize");
const { SELECT } = require("sequelize/lib/query-types");

const sequelize = new Sequelize(CONNECTION_STRING, {dialect: "postgres"});
    



module.exports = {
    getProducts: (req, res) => {
        sequelize.query(`
            select * from products;
        `).then((db) => {
            console.log('DB', db)
            res.status(200).json(db[0])
        }).catch(err => console.log('error getting all products from DB', err))

    },

    addToCart: (req, res) => {
        const {product} = req.body;
        console.log(req.body)
        sequelize.query(`
            insert into cart_items(product_id)
            values(${product})
            returning *;
        `).then((db) => {
            console.log('DB', db)
            res.status(200).json(db[0])
        }).catch(err => console.log('error adding product to DB', err))

        
    },

    getTotal: (req, res) => {
        sequelize.query(`
            select count(*) as total from cart_items

        `).then((db) => {
            console.log('DB', db)
            res.status(200).json(db[0])
        }).catch(err => console.log('error getting total to DB', err))
    },

    getSubmit: (req, res) => {
        const {email} = req.body;
        console.log(req.body);
        sequelize.query(`
            insert into emails(address)
            values('${email}')
            returning *;
        `).then((db) => {
            console.log('DB', db)
            res.status(200).json(db[0])
        }).catch(err => console.log('error submitting email', err))
    },
    
    getCartProducts: (req, res) => {
        sequelize.query(`
        select * from cart_items as ci
        join products on ci.product_id = products.product_id;
        `).then((db) => {
            console.log('DB', db)
            res.status(200).json(db[0])
        }).catch(err => console.log('error submitting email', err))
    }
    

}
