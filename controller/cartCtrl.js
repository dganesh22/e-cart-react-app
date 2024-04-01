const { StatusCodes } = require('http-status-codes')
const Cart = require('../model/cart')

// create
const createCart = async (req,res) => {
    try {
        let { products } = req.body
        let user = req.userId

        // create cart
        let data = await Cart.create({
            user,
            products
        })

        
        return res.status(StatusCodes.CREATED).json({ status: true, length: data.length, cart: data })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}
// read all
const allCart = async (req,res) => {
    try {
        return res.json({ msg: "all cart"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}
// read single
const singleCart = async (req,res) => {
    try {
        return res.json({ msg: "single cart"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}
// update
const updateCart = async (req,res) => {
    try {
        return res.json({ msg: "update cart"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}
// delete 
const deleteCart = async (req,res) => {
    try {
        return res.json({ msg: "delete cart"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

module.exports = { createCart, allCart, singleCart, updateCart, deleteCart }