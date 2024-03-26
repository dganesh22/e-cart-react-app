const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        title: {},
        image: {},
        desc: {},
        price:{},
        stock: {},
        SKU: {},
        category: {},
        discount: {},
        isActive: {}
    },{
        collection: "products",
        timestamps: true
    })

    module.exports = mongoose.model("Product", ProductSchema)