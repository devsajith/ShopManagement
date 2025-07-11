//Importing  mongoose 
const mongoose = require('mongoose');
//Defining the schema for the Item model
const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        requried: true
    },
    type: {
        type: String,
        required:true
    },
    itemCode:{
        type: String,
        required:true

    },
    wholeSaleRate: {
        type: Number,
        required:true,
    
    },
    retailRate: {
        type: Number,
        required:true
    },
    version:{
        type:Number,
        required:true
    },
    createDate: {
        type:Date,
        required:true
    },
    updateDate: {
        type:Date,
        required:true
    }

})
//Exporting the Item Modell
module.exports = mongoose.model('Item',itemSchema)
