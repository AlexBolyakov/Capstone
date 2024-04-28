require('dotenv').config();
const express = require("express");
const cors = require("cors");
const {SERVER_PORT} = process.env;
const {seed} = require('./controllers/seed.js');

const {getProducts, addToCart, getTotal, getSubmit, getCartProducts} = require('./controllers/controller.js')

const app = express();



app.use(express.json());
app.use(cors());

 
app.post('/seed', seed);

app.get('/api/products', getProducts);

app.post('/api/cart', addToCart);

app.get('/api/carttotal', getTotal);

app.post('/api/email', getSubmit);

app.get('api/cartproducts', getCartProducts);

app.listen(SERVER_PORT, () => console.log(`server running on port ${SERVER_PORT}`));
