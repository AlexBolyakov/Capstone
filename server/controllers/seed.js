require("dotenv").config();
const{CONNECTION_STRING} = process.env;
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {dialect: "postgres"});
    



module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists products;
        drop table if exists cart_items;
        drop table if exists emails;

        create table products(
            product_id serial primary key,
            name varchar(30),
            image text,
            alt varchar(20),
            price integer,
            rating integer
        );

        create table cart_items(
            cart_id serial primary key,
            product_id integer references products(product_id)
        );

        create table emails(
            email_id serial primary key,
            address varchar(30)
        );

        insert into products(name, image, price, alt, rating)
        values('Versace', 'images/versace.jpeg', 60, 'Versace', 5),
        ('Diesel', 'images/diesel.jpeg', 85, 'Diesel', 5),
        ('Jaguar', 'images/jaguar.jpeg', 20, 'Jaguar', 3),
        ('Hugo Boss', 'images/hugoboss.jpeg', 65, 'Hugo Boss', 4),
        ('Dolce Gabbana', 'images/dolcegabbana.jpeg', 75, 'Dolce Gabbana', 5),
        ('Davidoff', 'images/davidoff.jpeg', 35, 'Davidoff', 2),
        ('Armani', 'images/armani.jpeg', 45, 'Armani', 2);
        `).then(() => {
            console.log('DB seeded.')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}
