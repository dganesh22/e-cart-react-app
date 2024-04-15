const userRoute = require("express").Router()
const { readAllUsers } = require("../controller/userCtrl")

userRoute.get("/all", readAllUsers)

module.exports = userRoute