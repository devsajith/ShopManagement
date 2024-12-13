const express = require('express');
const user = require('../controller/userController');

const router = express.Router();
router.post('/user/adduser', user.addUser);
router.get("/user/:id",user.viewUser);
router.post("/user/:id",user.updateUser);

module.exports = router;