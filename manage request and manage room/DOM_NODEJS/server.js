const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const UserModel = require("./models/user")
const RoomModel = require("./models/room")

app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/DOM_NODEJS", { useNewUrlParser: true }, (err) => {
    if (err) console.log(err)
    else console.log("Connect Success!!");
})

app.get("/sign_up", (req, res) => {
    res.sendFile(__dirname + "/views/templates/signUpUser.html");
})

app.post("/add_user", (req, res) => {
    UserModel.create({
        username: req.body.username,
        password: req.body.password,
        identifycard: req.body.identifycard,
        phone_number: req.body.phonenumber,
        email: req.body.email,
        birth: req.body.birth
    }, (err, user) => {
        if (err) console.log(err)
        else console.log("success!")
    })
    res.redirect("/sign_up")
})

app.get("/homepage", (req, res) => {
    res.sendFile(__dirname + "/views/templates/homepage.html")
})

app.get("/manager_homepage", (req, res) => {
    res.sendFile(__dirname + "/views/templates/homepagemanager.html")
})

app.get("/room_map", (req, res) => {
    res.sendFile(__dirname + "/views/templates/room_map.html")
})

app.get("/add_room", (req, res) => {
    var area = ['B3', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B13'];
    var floor = ['1', '2', '3', '4'];
    var rooms = ['105', '106', '107', '108', '109', '110', '111', '112', '112A', '113', '114', '115', '116'];

    for (var i = 0; i < area.length; i++) {
        for (var j = 0; j < floor.length; j++) {
            for (var k = 0; k < rooms.length; k++) {
                RoomModel.create({ building: area[i], room_status: "ready", room_id: area[i] + floor[j] + rooms[k], room_price: 400, members: [] }, (err, room) => {
                    if (err) console.log(err)
                    else console.log("add success!!")
                })

            }
        }
    }
    res.send("gotcha")



})

app.get("/room/:roomId", (req, res) => {
    res.sendFile(__dirname + "/views/templates/room_info.html")
})

app.get("/changePage/:roomId", (req, res) => {
    const roomId = req.params.roomId;

    RoomModel.findOne({ room_id: roomId }, (err, data) => {
        if (err) console.log(err)
        else res.redirect(`/room/${data.room_id}`)
    })
})

app.get("/detail/:roomId", (req, res) => {
    const roomId = req.params.roomId;

    RoomModel.findOne({ room_id: roomId }, (err, data) => {
        if (err) console.log(err)
        else res.send(data)
    })
})


app.get("/resultAmount", (req, res) => {
    UserModel.find({ user_status: "notApproving" }, (err, user) => {
        if (err) console.log(err)
        else res.send(user)
    })
})


app.get("/table_register", (req, res) => {
    res.sendFile(__dirname + "/views/templates/table_register.html")
})




app.get("/choose_room/:id", (req, res) => {
    var id_user = req.params.id;
    UserModel.findOneAndUpdate({_id:id_user},{$set:{user_status:"approving"}},(err,data)=>{
        if(err) console.log(err)
        else res.redirect("/table_register")
    })
})


app.get("/approving_room", (req, res) => {
    UserModel.find({ user_status: "approving" }, (err, data) => {
        if (err) console.log(err)
        else res.send(data)
    })
})

app.get("/add_to_room/:id_room", (req, res) => {
    id_room = req.params.id_room;
    RoomModel.findOne({ _id: id_room }, (err, data) => {
        if (err) console.log(err)
        else res.send(data)
    })
})

// app.get("/data_user_approving/:id_room", (req, res) => {
//     res.sendFile(__dirname + "/views/templates/add_to_room.html")
// })

// app.get("/get_room_ready/:id", (req, res) => {
//     var room_id = req.params.id
//     RoomModel.findOne({ room_id:room_id }, (err, data) => {
//         if (err) console.log(err)
//         else res.send(data)
//     })
// })
// app.get("/room_ready", (req, res) => {
//     res.sendFile(__dirname + "/views/templates/choose_room.html")
// })
app.get("/fromdb_to_room/:id_room/:id_user", (req, res) => {
    var id = req.params.id_user;
    UserModel.findOneAndUpdate({ _id: id }, { $set: { user_status: "waitingToApproved" } }, (err, data) => {
        if (err) console.log(err)
        else res.sendFile(__dirname + "/views/templates/approved_user.html")
        // else res.send(data)
    })
})

// app.get("/approved_user",(req,res)=>{
//     res.sendFile(__dirname + "/views/templates/approved_user.html")
// })



app.get("/approved_user/:id", (req, res) => {
    var id = req.params.id;
    UserModel.findOne({ _id: id }, (err, data) => {
        if (err) console.log(err)
        else res.send(data)
    })
})


 
app.get("/confirm_add_user/:id_user/:id_room", (req, res) => {
    var id_user = req.params.id_user;
    var id_room = req.params.id_room;
    UserModel.findByIdAndUpdate(id_user,{$set:{user_status:"approved"}},{new:true},(err,user) => {
        if (err) console.log(err)
        else {
            RoomModel.findByIdAndUpdate(
                id_room,
                { $push: { members: user } },
                (error, roomUpdated) => {
                    if (error) console.log(error)
                    else res.sendFile(__dirname+"/views/templates/success.html");
                }
            )
            // res.send(user)
        }
    })
})

app.get("/notApprovedRegister/:id", (req, res) => {
    var id = req.params.id;
    UserModel.findOneAndUpdate({ _id: id }, { $set: { user_status: "NotApproved" } }, (err, data) => {
        if (err) console.log(err)
        else res.redirect("/table_register")
    })
})

app.get("/notApproved/:id", (req, res) => {
    var id = req.params.id;
    UserModel.findOneAndUpdate({ _id: id }, { $set: { user_status: "NotApproved" } }, (err, data) => {
        if (err) console.log(err)
        else res.redirect("/table_to_add")
    })
})

app.get("/test",(req,res)=>{
    RoomModel.find({},(err,data)=>{
        if(err) console.log(err)
        else res.send(data)
    })
})

app.get("/table_to_add",(req,res)=>{
    res.sendFile(__dirname+"/views/templates/table_room_to_add.html")
})

app.get("/room_info_approving_user/:id_room",(req,res)=>{
    res.sendFile(__dirname+"/views/templates/add_to_room.html")
})

app.get("/update_room/:id",(req,res)=>{
    res.sendFile(__dirname+"/views/templates/update_room.html")
})

app.post("/room_update/:roomId", (req,res)=>{
    var roomid = req.params.roomId;
    var roomstatus = req.body.roomstatus;
    var room_id = req.body.roomid;
    var price = req.body.price;
    RoomModel.findOneAndUpdate({_id:roomid},{$set:{room_id:room_id,room_status:roomstatus,room_price:price}},(error,data)=>{
        if(error) console.log(error)
        else res.send("gotcha")
    })
})

app.get("/update_success",(req,res)=>{
    res.sendFile(__dirname+"/views/templates/update_success.html")
})

app.listen(6969, (err) => {
    if (err) console.log(err)
    else console.log("server start!!")
})

