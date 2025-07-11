const User = require("../models/user");// Importing the User model
const { ObjectId } = require("mongodb");// Importing ObjectID from MongoDB
const date = new Date();// Creating instance for timestamping
const LOGGER = require('../logger/logger.util');// Importing a logger utility

const addUser = async (req, res) => {
    try {
        //prepare the user payload from request body
        const userPayload = {
            phone: req.body.phone,
            userName: req.body.userName,
            oldBalance: req.body.oldbalance,
            newCredit: req.body.newCredit,
            version:0,
            creditStatus: req.body.creditStatus,
            createDate: date.toISOString(),//Current date and time in ISO format
            updateDate: date.toISOString()//Current date and time in ISO format
        };
        //create a new user instance with the payload
        const regPayload = new User(userPayload);
        // cheque if a user with the same phone number already exists
        const existUser = await User.find({ phone: req.body.phone })
        if (existUser.length != 0) {
            console.log("user exists", existUser);
            res.status(400).send({ message: "User already Exist" })
            return;
        }
        //save the new user to the database 
        await regPayload.save();  // Added 'await' for proper async handling
        res.send({ status: 200, message: "success" });//send success response
    } catch (error) {
        console.log("Error In addUser", error);
        res.status(500).send({ message: "Error adding user" }); // Sending error response to client
    };
}
const viewUser = async (req, res) => {
    console.log("listUser Running");
    try {
        const userId = req.params.id // Extract user ID from request parameters
        const query = { _id: new ObjectId(userId) } //Query to find user by ID
        const user = await User.findOne(query) // Fetch the user from the database
        res.status(200).send({ message: "success", result: user }) // Send Success response
    }
    catch (error) {
        console.log("error ilstUser", error);
        res.status(401).send(error) //send error response to the client
    }
}
const updateUser = async (req, res) => {
    try {
        console.log("updateUser");
        const id = req.params.id; // Extract user ID from request parameters
        const userRecord = await User.findById(id); // fetch the user record by ID
        // update details with the request body values
        userRecord.userName = req.body.name;
        userRecord.creditStatus = req.body.creditStatus;
        userRecord.newCredit = req.body.newCredit;
        userRecord.oldBalance = req.body.oldBalance;
        userRecord.updateDate = date.toISOString() //update modification timestamp
        await userRecord.save();
        res.status(200).send({ message: "success" }); // Send error response to the client
    }
    catch (error) {
        console.log("updateUser", error);
    }
}
// Export the functions 
module.exports = {
    addUser,
    viewUser,
    updateUser
}