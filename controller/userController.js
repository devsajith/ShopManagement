const User = require("../models/user");
const { ObjectId } = require("mongodb");
const date = new Date();
const LOGGER = require('../logger/logger.util');

const addUser = async (req, res) => {
    try {
        const userPayload = {
            phone: req.body.phone,
            userName: req.body.name,
            oldBalance: req.body.oldbalance,
            newCredit: req.body.newCredit,
            creditStatus: req.body.creditStatus,
            createDate: date.toISOString(),
            updateDate: date.toISOString()
        };
        const regPayload = new User(userPayload);
        // cheque the phone number is exist or not
        const existUser = await User.find({ phone: req.body.phone })
        if (existUser.length != 0) {
            console.log("user exists", existUser);
            res.status(400).send({ message: "User already Exist" })
        }
        await regPayload.save();  // Added 'await' for proper async handling
        res.send({ status: 200, message: "success" });
    } catch (error) {
        console.log("Error In addUser", error);
        res.status(500).send({ message: "Error adding user" }); // Sending error response to client
    };
}
const viewUser = async (req, res) => {
    console.log("listUser Running");
    try {
        const userId = req.params.id
        const query = { _id: new ObjectId(userId) }
        const user = await User.findOne(query)
        res.status(200).send({ message: "success", result: user })
    }
    catch (error) {
        console.log("error ilstUser", error);
        res.status(401).send(error)
    }
}
const updateUser = async (req, res) => {
    try {
        console.log("updateUser");
        const id = req.params.id;
        const userRecord = await User.findById(id);
        userRecord.userName = req.body.name;
        userRecord.creditStatus = req.body.creditStatus;
        userRecord.newCredit = req.body.newCredit;
        userRecord.oldBalance = req.body.oldBalance;
        userRecord.updateDate = date.toISOString()
        await userRecord.save();
        res.status(200).send({ message: "success" });
    }
    catch (error) {
        console.log("updateUser", error);
    }
}
module.exports = {
    addUser,
    viewUser,
    updateUser
}