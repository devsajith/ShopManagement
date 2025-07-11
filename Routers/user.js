//Importing express 
const express = require('express');
//importing User controller
const user = require('../controller/userController');

//Creating a new router instance 
const router = express.Router();
// Route for adding a new user
router.post('/user/adduser', user.addUser);
// Route for viewing a user by ID
router.get("/user/:id",user.viewUser);
// Route for updating a user by ID
router.post("/user/:id",user.updateUser);

module.exports = router;