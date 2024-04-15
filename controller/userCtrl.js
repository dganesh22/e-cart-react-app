const { StatusCodes } = require('http-status-codes')
const UserModel = require('../model/user')

// read all user info except admin
const readAllUsers = async (req,res) => {
    try {
        let data = await UserModel.find({})

        res.status(StatusCodes.OK).json({ status: true, length: data.length, users: data })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

module.exports = { readAllUsers }