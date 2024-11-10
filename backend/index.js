const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const db = require('./Models/db')

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // corrected line

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

app.use('/auth', AuthRouter);
app.use('/product',ProductRouter)


app.listen(PORT, () => {
    console.log('Server started at port no', PORT);
});
