const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "enter a Product name"]
        },
        quantity: {
            type: String,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
        },
        price: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product