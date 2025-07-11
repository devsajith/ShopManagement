const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();

// Database Connection
const DbUri = 'mongodb://127.0.0.1:27017/shop';
mongoose.connect(DbUri);

mongoose.connection.on('connected', () => {
});

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors({ origin: "*" })); // Enables CORS for all origins

// Routes
const userRouter = require("./Routers/user");
const itemRouter = require("./Routers/items")
app.use(userRouter);
app.use(itemRouter);

// 404 Error Handling
app.use((req,res) => {
    res.status(404).send({ errorCode: 404, message: "API not found!" });
});

// Start Server
const port = 8000;
app.listen(port, () => {
});
