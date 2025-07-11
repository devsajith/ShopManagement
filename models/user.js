//Importing Mongoose
const mongoose = require('mongoose');
// Definig the schema for the User model 
const userSchema =new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    oldBalance: {
        type: Number,
        required: false
    },
    newCredit: {
        type: Number,
        required: true
    },
    creditStatus:{
        type: Number,
        required: true
    },
    version:{
        type:Number,
        required:true
    },
    createDate:{
        type:Date,
        required:true
    },
    updateDate:{
        type:Date,
        required:true
    }
})
//Exporting the User model
module.exports = mongoose.model('User',userSchema)