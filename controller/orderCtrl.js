const Order = require('../model/order')
const { StatusCodes } = require('http-status-codes')

// create
const createOrder = async (req,res) => {
    try {
        return res.json({ msg: "create order"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// all
const allOrder = async (req,res) => {
    try {
        return res.json({ msg: "all order"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}
// single
const singleOrder = async (req,res) => {
    try {
        return res.json({ msg: "single order"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// update
const updateOrder = async (req,res) => {
    try {
        return res.json({ msg: "update order"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}
// delete
const deleteOrder = async (req,res) => {
    try {
        return res.json({ msg: "delete order"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

module.exports = { createOrder, allOrder, singleOrder, updateOrder, deleteOrder}