const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productsModel')
const app = express()
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    const routes = [
        '/',
        '/blogs',
        '/products',
        '/products/:id',
        'POST /products',
        'PUT /products/:id',
        'DELETE /products/:id'
    ];

    res.json({ message: 'Routes available', routes });
});

app.get('/blogs', (req, res) => {
    res.send('Hello Blogs, im happy to be here')
})

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }

})

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: 'cannot find product' })
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'cant find product' })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})



mongoose.
    connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3000, () => {
            console.log('Node Api app is running in port 3000')
            console.log('Connected To DB')
        })
    }).catch((err) => {
        console.log('Unable to connect', err)
    })