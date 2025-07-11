const Item =require("../models/item");
const LOGGER = require('../logger/logger.util')
const date = new Date();// Creating instance for timestamping
const { ObjectId } = require("mongodb");// Importing ObjectID from MongoDB



const addItem  =  async(req,res)=>{

    try{
        const itemPayload = {
            
            itemName:req.body.itemName,
            type:req.body.itemType,
            itemCode:req.body.itemCode,
            wholeSaleRate:req.body.wholeSaleRate,
            retailRate:req.body.retailRate,
            version:0,
            createDate:date.toISOString(),
            updateDate:date.toISOString()
        }
        const iPayload = new Item(itemPayload);
        await iPayload.save()
        res.status(200).send({ message: "success" }); // Send error response to the client
    

    }catch(error){
        console.log("error In Add Item", error);
                
    }
}
    const updateItem = async(req,res)=>{

        try{
            const id = req.params.id;
            const query = { _id: new ObjectId(id) } //Query to find Item by ID
            const itemRecord =  await Item.findOne(query);
            itemRecord.itemName = req.body.itemName
            itemRecord.type = req.body.itemType
            itemRecord.wholeSaleRate =req.body.wholeSaleRate
            itemRecord.retailRate = req.body.retailRate
            itemRecord.version = itemRecord.version+1
            itemRecord.updateDate = date.toISOString()
            await itemRecord.save();
            res.status(200).send({ message: "success" }); // Send error response to the client

        }catch(error){
            console.log("error in uoadate Item", error);
            
        }

    }

    const viewItem = async(req,res)=>{
        try{
        const id = req.params.id;
        const query = { _id: new ObjectId(id) } //Query to find Item by ID
        const item =  await Item.findOne(query);
        res.status(200).send({message:"success",item})
        }
        catch(error){
            console.log("error in view Item",error);
        }

    }
module.exports = {
    addItem,
    updateItem,
    viewItem
}