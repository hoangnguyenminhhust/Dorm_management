const mongoose = require("mongoose")
const model = mongoose.model
const schema = mongoose.Schema

const room = new schema({
    building:{type:String},
    room_status:{type:String},
    room_id:{type:String},
    room_price: {type:Number},
    members: {type:Array},
})

module.exports = model("room",room)