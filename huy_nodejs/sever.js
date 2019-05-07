const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const adminModel = require('./models/admin');
const mongoose = require('mongoose');
const md5 = require('md5');
const manageModel = require('./models/manager');

mongoose.connect(//kết nối database online 
    'mongodb://localhost:27017/dom_manager',
    {useNewUrlParser:true},
    (err)=>{
        if(err) console.log(err)
        else console.log("Connect to DB Success!");
});
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('public'));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.listen(8787,(err)=>{
    if(err) console.log(err)
    else console.log('Connected Sever');
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/views/homepage.html');
});

app.get('/register',(req,res)=>{
    res.sendFile(__dirname + '/public/views/register.html');
});

app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/public/views/login.html');
});

app.get('/login_user_info',(req,res)=>{
    // res.json({
    //     userInfo: req.session.authUser,
    // })
    res.send(req.session.authUser);
})

app.get('/homepagemanager',(req,res)=>{
    res.sendFile(__dirname +'/public/views/homepagemanager.html');
})

app.get('/room_map',(req,res)=>{
    res.sendFile(__dirname + '/public/views/room_map.html');
})

app.get('/log_out',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

app.get('/admin',(req,res)=>{
    res.sendFile(__dirname +'/public/views/admin.html');
})

app.get('/manage_manager',(req,res)=>{
    res.sendFile(__dirname + '/public/views/manage_manager.html');
})

app.get('/get_manager', (req, res) => {
    manageModel.find((err, managers) => {
        if (err) console.log(err)
        else res.send(managers);
    })
})

app.delete('/delete_manager/:managerId', (req, res) => {
    var managerId = req.params.managerId;
    manageModel.findByIdAndDelete(
        managerId,
        (err, deteled) => {
            if (err) res.status(500).json({ success: 0, message: err })
            else res.json({ success: 1, message: "Delete success!!" });
        }
    )
})

app.get('/add_manager',(req,res)=>{
    res.sendFile(__dirname + '/public/views/add_manager.html')
})

app.post('/createAccount',async function(req,res){
    console.log(req.body);
    const username = req.body.username;
    const password = md5(req.body.password);
    console.log(password);
    newUser = await adminModel.create({username: username, password: password});
    res.json({
        success: true,
        message: 'register successs'
    })
});

app.post('/creatManager',async function(req,res){
    console.log(req.body);
    const usertname = req.body.username;
    const password = md5(req.body.password);
    const fullname = req.body.fullname;
    const identifyCard = req.body.identifyCard;
    const phone = req.body.phone;
    const email = req.body.email;
    const birth = req.body.birth;

    newManager = await manageModel.create({username: usertname, password: password, fullname:fullname,identifyCard:identifyCard,phone:phone,email:email,birth:birth});

    res.json({
        success:true,
        message:'Add new manager success'
    })
});

app.post('/login', async function(req,res){
    // console.log(req.body);
    const username = req.body.username;
    const password = md5(req.body.password);
    console.log(password);
    // console.log(password);
    accountValid = await adminModel.findOne({username: username}).exec();
    if(accountValid){
        if(accountValid.password == password){
            req.session.authUser = {
                id: accountValid._id,
                username: accountValid.username,
            };
            req.session.save();
            console.log(req.session.authUser);
            

            // console.log(logined_user);

            // res.json({
            //     success: true,
            //     message:'login successful',
            // });

            res.redirect("/homepagemanager");
        }else{
            res.json({
                message: 'password wrong'
            })
        }
    }else{
        res.json({
            message: 'username not found'
        })
    }
});