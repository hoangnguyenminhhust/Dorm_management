const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const adminModel = require('./models/admin');
const mongoose = require('mongoose');
const md5 = require('md5');
const manageModel = require('./models/manager');
const roomModel = require('./models/room');
const nodemailer = require('nodemailer');
const studentModel = require('./models/student')
const requestModel = require('./models/request')
const receiptModel = require('./models/receipt')

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
app.get('/homepage',(req,res)=>{
    res.sendFile(__dirname + '/public/views/homepage.html');
});

app.get('/homepage_student',(req,res)=>{
    res.sendFile(__dirname + '/public/views/student/homepage_student.html');
});

app.get('/register',(req,res)=>{
    res.sendFile(__dirname + '/public/views/admin/register.html');
});

app.get('/login_admin',(req,res)=>{
    res.sendFile(__dirname + '/public/views/admin/login_admin.html');
});

app.get('/login_student',(req,res)=>{
    res.sendFile(__dirname + '/public/views/student/login_student.html');
});

app.get('/log_out',(req,res)=>{
    req.session.destroy(function(err){
        if(err) {console.log(err)}
        else{res.redirect('/homepage_admin');}
    });
})

app.get('/login_user_info',(req,res)=>{
    res.send(req.session.authUser);

})

app.get('/detail_fee/:studentID',(req,res)=>{
    res.sendfile(__dirname + '/public/views/student/detail_fee.html')
})

app.get('/detail_manager/:studentID',(req,res)=>{
    res.sendfile(__dirname + '/public/views/manager/detail_manager.html')
})

app.get('/manage_fee',(req,res)=>{
    res.sendfile(__dirname + '/public/views/admin/manage_fee.html')
})

app.post('/createAccount',async function(req,res){
    const username = req.body.username;
    const password = md5(req.body.password);
    newUser = await adminModel.create({username: username, password: password});
    res.json({
        success: true,
        message: 'register successs'
    })
});

/////////////Student////////////
var rand,mailOptions,host,link;
app.post("/add_student", async(req, res) => {
    const hashpassword = md5(req.body.password,12)
    // const hashpassword = bcrypt.hashSync(req.body.password, 12)
    await studentModel.create({
        account: req.body.account,
        password: hashpassword,
        fullname: req.body.fullname,
        gender: req.body.gender,
        phone_number: req.body.phonenumber,
        email: req.body.email_student,
        birth: req.body.birth,
        branch: req.body.khoa,
        course: req.body.Khoá,
        identifycard: req.body.identifycard,
        dienchinhsachuutientheoquydinh: req.body.uutien,
        dienkhac: req.body.dienkhac,
        doanthe: req.body.doanthe,
        hoatdongxahoi: req.body.xahoi,
        sotruong_nangkhieu: req.body.nangkhieu,
        khicanbaocho_ong_ba: req.body.phuhuynh,
        email_ong_ba: req.body.email_parent,
        dienthoaiong_ba: req.body.phonenumber_parent,
    }, (err, student) => {
        const student_id = student._id;
        const newRequest = requestModel.create({request_status:'none',student:student_id},(err,request)=>{
            if(err) console.log(err)
            else console.log('Set request:none')
        })
        if (err) console.log(err)
        else {
            if (student.email.split("@")[student.email.split("@").length - 1] == "sie.edu.vn") {
                var transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: "tranhoanglinh11101998@gmail.com",
                        pass: "linhdz123",
                    }
                });
                rand = student._id
                host = req.get('host');
                link = "http://" + req.get('host') + "/verify?id=" + rand;
                mailOptions = {
                    from: "tranhoanglinh11101998@gmail.com@gmail.com",
                    to: student.email,
                    subject: "Please confirm your Email account of dormitory HUST",
                    html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
                }
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) console.log(err)
                    else {
                        console.log("Email test" + info.response)
                    }
                })
            }
        }
    })
    res.redirect("/signup_student")
})

app.get('/verify', function (req, res) {
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");
        if (req.query.id == rand) {
            requestModel.findOneAndUpdate({ student: rand }, { $set: { request_status: "aproving" } }, (err, data) => {
                if (err) console.log(err)
                else console.log("email is verified");
                res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
            })
        }
        else {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else {
        res.end("<h1>Request is from unknown source");
    }
}); 
///////////////////////////////////////////
app.get('/manage_fee_manager',(req,res)=>{
    res.sendFile(__dirname + '/public/views/manager/manage_fee.html')
})
app.get('/manage_room_manager',(req,res)=>{
    res.sendFile(__dirname + '/public/views/manager/manage_rooms.html')
})
app.get('/manage_request_manager',(req,res)=>{
    res.sendFile(__dirname + '/public/views/manager/manage_request.html')
})

app.get('/detail_student',(req,res)=>{
    res.sendFile(__dirname + '/public/views/student/detail_student.html');

})
app.get('/detail_room/:roomID',(req,res)=>{
    res.sendFile(__dirname + '/public/views/student/detail_room.html');

})

app.get('/login_manager', function(req,res){
    res.sendFile((__dirname + '/public/views/manager/login_manager.html'))
} )

app.get('/homepage_manager',function(req,res){
    res.sendFile((__dirname + '/public/views/manager/homepage_manager.html'))
})

app.post('/login_manager', async function(req,res){
    const username = req.body.username;
    const password = md5(req.body.password);
    accountValid = await manageModel.findOne({username: username}).exec();
    if(accountValid){
        if(accountValid.password == password){
            req.session.authUser = {
                id: accountValid._id,
                username: accountValid.username,
                fullname: accountValid.fullname,
                identifycard:accountValid.identifyCard,
                phone_number:accountValid.phone,
                birth: accountValid.birth,
                email:accountValid.emailungnh
            };
            req.session.save();
            res.redirect("/homepage_manager");
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

app.post('/login_student', async function(req,res){
    const username = req.body.username;
    const password = md5(req.body.password);
    accountValid = await studentModel.findOne({account: username}).exec();
    receiptValid = await receiptModel.findOne({student:accountValid._id}).populate('student')
    if(accountValid){
        if(accountValid.password == password){
            req.session.authUser = {
                id: accountValid._id,
                username: accountValid.account,
                fullname: accountValid.fullname,
                gender:accountValid.gender,
                branch:accountValid.branch,
                course:accountValid.course,
                identifycard:accountValid.identifycard,
                email:accountValid.email,
                dienchinhsachuutientheoquydinh: accountValid.dienchinhsachuutientheoquydinh,
                dienkhac:accountValid.dienkhac,
                doanthe:accountValid.doanthe,
                hoatdongxahoi:accountValid.hoatdongxahoi,
                sotruong_nangkhieu:accountValid.sotruong_nangkhieu,
                phone_number:accountValid.phone_number,
                birth: accountValid.birth,
                khicanbaocho_ong_ba: accountValid.khicanbaocho_ong_ba,
                dienthoaiong_ba:accountValid.dienthoaiong_ba,
                email_ong_ba:accountValid.email_ong_ba,
                room:accountValid.room
            };
            req.session.save();
            res.redirect("/homepage_student");
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
app.post('/login_admin', async function(req,res){
    const username = req.body.username;
    const password = md5(req.body.password);
    accountValid = await adminModel.findOne({username: username}).exec();
    if(accountValid){
        if(accountValid.password == password){
            req.session.authUser = {
                id: accountValid._id,
                username: accountValid.username,
            };
            req.session.save();
            res.redirect("/homepage_admin");
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

//////Admin
app.get('/homepage_admin',(req,res)=>{
    res.sendFile(__dirname +'/public/views/admin/homepage_admin.html');
})
//Manage Manager

app.get('/manage_manager',(req,res)=>{
    res.sendFile(__dirname + '/public/views/admin/manage_manager.html');
})

app.get('/edit_manager/:managerId',(req,res)=>{
    res.sendFile(__dirname + '/public/views/admin/edit_manager.html');
})



app.get('/get_manager', (req, res) => {
    manageModel.find((err, managers) => {
        if (err) console.log(err)
        else res.send(managers);
    })  
})

app.delete('/delete_manager/:managerId', (req, res) => {
    var managerId = req.params.managerId;
    manageModel.findByIdAndDelete(managerId,(err, deteled) => {
            if (err) res.status(500).json({ success: 0, message: err })
            else res.json({ success: 1, message: "Delete success!!" });
        }
    )
})

app.get('/add_manager',(req,res)=>{
    res.sendFile(__dirname + '/public/views/admin/add_manager.html')
})

app.get('/edit_manager/get-manager-info/:managerId',function(req,res){
    var managerId = req.params.managerId;
    manageModel.findById(managerId, (err, foundManager) => {
        if (err) console.log(err)
        else res.send(foundManager);
    })
})


app.post('/updateManager', function(req,res){
    const data = req.body;
    updatedManager = {
        username: data.username,
        fullname: data.fullname,
        password: md5(data.password),
        identifyCard: data.identifyCard,
        phone: data.phone,
        email: data.email,
        birth: data.birth,
    }

    manageModel.findByIdAndUpdate(
        data.id,
        { $set: updatedManager },
        { new: true },
        (err, updated) => {
            if (err) console.log(err)
            else res.json({ success: 1, message: 'success!' })
        }
    )
});

app.post('/creatManager',async function(req,res){
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
//Manage Request/////
app.get('/manage_request',(req,res)=>{
    res.sendFile(__dirname + '/public/views/admin/manage_request.html')
})

app.get('/get_request', async (req,res)=>{
    requestModel.find({request_status:'aproving'},(err,requests)=>{
        if(err) console.log(err)
        else res.send(requests)
    }).populate('student');
})

app.get('/confirmed_request',(req,res)=>{
    res.sendFile(__dirname + '/public/views/admin/confirmed_request.html')
})

app.get('/get_confirmed_request', async (req,res)=>{
    requestModel.find({$or : [ {request_status:'not_approve'}, {request_status:'approved'}, {request_status:'final approved'}]},(err,requests)=>{
        if(err) console.log(err)
        else res.send(requests)
    }).populate('student');
})

app.get('/view_student/get-student-info/:studentId',function(req,res){
    var studentId = req.params.studentId;
    studentModel.findById(studentId, (err, foundStudent) => {
        if (err) console.log(err)
        else res.send(foundStudent);
    })
})

app.get('/view_student_manager/get-student-info/:studentId',function(req,res){
    var studentId = req.params.studentId;
    studentModel.findById(studentId, (err, foundStudent) => {
        if (err) console.log(err)
        else res.send(foundStudent);
    })
})

app.get('/detail_fee/get-fee-info/:studentId',function(req,res){
    var studentId = req.params.studentId;
    receiptModel.findOne({student:studentId}, (err, foundReceipt) => {
        if (err) console.log(err)
        else res.send(foundReceipt);
    }).populate('student')
})

app.get('/view_student_fee/get-fee-info/:studentId',function(req,res){
    var studentId = req.params.studentId;
    receiptModel.findOne({student:studentId}, (err, foundReceipt) => {
        if (err) console.log(err)
        else res.send(foundReceipt);
    }).populate('student')
})

app.get('/view_student_fee_manager/get-fee-info/:studentId',function(req,res){
    var studentId = req.params.studentId;
    receiptModel.findOne({student:studentId}, (err, foundReceipt) => {
        if (err) console.log(err)
        else res.send(foundReceipt);
    }).populate('student')
})

app.get('/view_student/:studentId',(req,res)=>{
    res.sendFile(__dirname + '/public/views/admin/view_student.html');
})

app.get('/view_student_manager/:studentId',(req,res)=>{
    res.sendFile(__dirname + '/public/views/manager/view_student.html');
})

app.get('/extend_student/get-student-info/:studentId',async function(req,res){
    var studentId = req.params.studentId;
    await receiptModel.findOne({student:studentId}, (err, foundStudent) => {
        if (err) console.log(err)
        else res.send(foundStudent);
    }).populate('student')
})

app.post('/create_Valid_date',async function(req,res){
    const student_id = req.body.student_Id;
    const date_valid_room = req.body.date_valid_room;
    const date_valid_fee_living = req.body.date_valid_fee_living;
    const date_valid_fee_room = req.body.date_valid_fee_room;

    await studentModel.findByIdAndUpdate(student_id,{date_valid_room: date_valid_room, user_status:'Available'},(student,err)=>{
        if(err) console.log(err)
        else console.log('Update date valid room success')
    });

    await receiptModel.findOneAndUpdate({student:student_id},{
        date_valid_fee_room: date_valid_fee_room,
        date_valid_fee_living: date_valid_fee_living,
        payment_room_status:'Đã thanh toán',
        payment_living_status:'Đã thanh toán'
        
    },(receipt,err)=>{
        if(err) console.log(err)
        else console.log('Update date valid  fee room, fee living success')
    }).populate('student');

    res.json({
        success: true,
        message: 'register successs'
    })
});

app.get('/extend_student/:studentId',(req,res)=>{
    res.sendFile(__dirname + '/public/views/admin/extend_student.html');
})
app.get('/extend_student_manager/:studentId',(req,res)=>{
    res.sendFile(__dirname + '/public/views/manager/extend_student.html');
})

app.post('/ignore_request/:requestId', (req, res) => {
    var requestId = req.params.requestId;
    requestModel.findByIdAndUpdate(requestId,{ $set: { request_status: "not_approve", approver:req.session.authUser.username, date_approve: Date.now() } }, (err, ignored) => {
            if (err) res.status(500).json({ success: 0, message: err })
            else res.json({ success: 1, message: "Ignore success!!" });
        }
    )
})

app.post('/add_request/:requestId', (req, res) => {
    var requestId = req.params.requestId;
    requestModel.findByIdAndUpdate(requestId,{ $set: { request_status: "approved", approver:req.session.authUser.username, date_approve: Date.now() } }, (err, approved) => {
            if (err) res.status(500).json({ success: 0, message: err })
            else res.json({ success: 1, message: "approved success!!" });
        }
    )
})

//Manage rooms
app.post('/add_status_student/:studentId/:roomId/:room_price',async (req, res) => {
    var room_price = req.params.room_price;
    var studentId = req.params.studentId;
    var roomId = req.params.roomId;
    await studentModel.findByIdAndUpdate(studentId,{ $set: { user_status: "Available", approver:req.session.authUser.username, date_approve: Date.now() } }, (err, ignored) => {
            if (err) console.log(err)
            else  console.log("Set status student: Available");
        }
    )
    await receiptModel.create({
        student:studentId, 
        room:roomId,
        payment_room_status:'Đã thanh toán',
        payment_living_status:'Đã thanh toán',
        fee_room:room_price
    },(err,receipt)=>{
        if(err) console.log(err)
        else console.log('Create receipt success')
    })
    res.redirect(`/add_student_room/${roomId}`)
})

app.post('/ignore_status_student/:studentId/:roomId', async (req, res) => {
    var studentId = req.params.studentId;
    var roomId = req.params.roomId
    await studentModel.findByIdAndUpdate(studentId,{ $set: { user_status: "None",room: null, approver:req.session.authUser.username, date_approve: Date.now() } }, (err, ignored) => {
            if (err) console.log(err)
            else console.log('Ignore status student success')
        }
    )
    await requestModel.findOneAndUpdate({student:studentId},{ $set: { request_status: "not_approve", approver:req.session.authUser.username, date_approve: Date.now() } }, (err, approved) => {
        if (err) console.log(err)
        else console.log('Set request status: not_approved success')
    }
)

res.redirect(`/add_student_room/${roomId}`)

})
app.post("/update_room_fee", (req,res)=>{
    data_id_student = req.body.data_student;
     receiptModel.findOneAndUpdate(
        {student:data_id_student},
        {payment_room_status:'Sắp tới hạn đóng phí phòng',
        payment_living_status:'Sắp tới hạn đóng phí phòng',
        approver:req.session.authUser.username, 
        date_approve: Date.now()
    },
        (receipt,err)=>{
        if(err) console.log(err)
        else console.log('sucesss')
    })
     studentModel.findByIdAndUpdate(data_id_student,{user_status:'Sắp tới hạn đóng phí phòng'},(receipt,err)=>{
        if(err) console.log(err)
        else console.log('success')
    })

    
    res.redirect('/manage_fee')  
})

app.post("/update_valid_room", (req,res)=>{
    data_id_student = req.body.data_student;
     receiptModel.findOneAndUpdate(
        {student:data_id_student},
        {payment_room_status:'Sắp đến hạn trả phòng',
        payment_living_status:'Sắp đến hạn trả phòng',
        approver:req.session.authUser.username, 
        date_approve: Date.now()
    },
        (receipt,err)=>{
        if(err) console.log(err)
        else console.log('sucesss')
    })
     studentModel.findByIdAndUpdate(data_id_student,{user_status:'Sắp đến hạn trả phòng'},(receipt,err)=>{
        if(err) console.log(err)
        else console.log('success')
    })
    res.redirect('/manage_fee')  
})

app.get('/get_student_room/:room_Id', async (req,res)=>{
    var room_Id = req.params.room_Id;
    studentModel.find({$and : [ {room:room_Id}, {user_status:'waiting_Available'}]},(err,student)=>{
        if(err) console.log(err)
        else res.send(student)
    }).populate('room');
})

app.get('/get_student_available_room/:room_Id', async (req,res)=>{
    var room_Id = req.params.room_Id;
    receiptModel.find({room:room_Id},(err,student)=>{
        if(err) console.log(err)
        else res.send(student)
    }).populate('student');
})

app.post('/change_student/:studentId/:room_Id', async (req, res) => {
    var roomId = req.params.room_Id;
    var studentId = req.params.studentId;
    await requestModel.findOneAndUpdate({student:studentId},{ $set: { request_status: "approved", approver:req.session.authUser.username, date_approve: Date.now() } }, (err, approved) => {
            if (err) console.log(err)
            else console.log('change to approved')
    })
    await studentModel.findByIdAndUpdate(studentId,{ $set: {room: null, approver:req.session.authUser.username, date_approve: Date.now() } }, (err, ignored) => {
        if (err) console.log(err)
        else console.log('set null room  success')
    })
    await receiptModel.findOneAndUpdate({student:studentId},{ $set: {room: null, approver:req.session.authUser.username, date_approve: Date.now() } }, (err, ignored) => {
        if (err) console.log(err)
        else console.log('set null room  success')
    })
res.redirect(`/add_student_room/${roomId}`)
})


app.post('/add_student_room/:student_Id/:room_Id/:status_student', function(req,res){
    var room_Id = req.params.room_Id;
    var student_Id = req.params.student_Id;
    var status_student = req.params.status_student;
    if(status_student == 'Available'){
        studentModel.findByIdAndUpdate(
            student_Id,
            { $set: {room:room_Id, approver:req.session.authUser.username, date_approve: Date.now()} },
            { new: true },
            (err, updated) => {
                if (err) console.log(err)
                else console.log('Set student status sccess')
            })
        receiptModel.findOneAndUpdate(
            {student:student_Id},
            { $set: {room:room_Id, approver:req.session.authUser.username, date_approve: Date.now()} },
            { new: true },
            (err, updated) => {
                if (err) console.log(err)
                else console.log('Set receipt: rooom_ID success')
            }
        )    

    }else{
        //Get date valid
    var today = new Date();
    var dd = String(today.getDate() + 4).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    valid_date = dd + '/' + mm + '/' + yyyy;
    //
        studentModel.findByIdAndUpdate(
            student_Id,
            { $set: {room:room_Id,user_status:'waiting_Available', approver:req.session.authUser.username, date_approve: Date.now(), date_valid: valid_date} },
            { new: true },
            (err, updated) => {
                if (err) console.log(err)
                else console.log('Set student status sccess')
            }
        )
    }
     studentModel.find({room:room_Id},(err,student)=>{
        if(err) console.log(err)
        else 
        roomModel.findByIdAndUpdate(
            room_Id,
            { $set: {amount_std: student.length} },
            { new: true },
            (err, updated) => {
                if (err) console.log(err)
                else console.log('Set amount student success')
            }
        )
    }).populate('room');

    
    requestModel.findOneAndUpdate({student:student_Id},{ $set: { request_status: "final approved", approver:req.session.authUser.username, date_approve: Date.now() } }, (err, approved) => {
        if (err) console.log(err)
        else console.log('Set request status success')
    }
)
    res.redirect(`/add_student_room_manager/${room_Id}`)
})

app.get('/get_approved_request', async (req,res)=>{
    requestModel.find({request_status:'approved'},(err,requests)=>{
        if(err) console.log(err)
        else res.send(requests)
    }).populate('student');
})

app.get('/view_student_fee/:student_id',(req,res)=>{
    res.sendFile(__dirname + '/public/views/admin/view_student_fee.html');
})
app.get('/view_student_fee_manager/:student_id',(req,res)=>{
    res.sendFile(__dirname + '/public/views/manager/view_student_fee.html');
})


app.get('/add_student_room_manager/:roomId',async (req,res)=>{
    var room_Id = req.params.roomId;
    await studentModel.find({room:room_Id},(err,student)=>{
        if(err) console.log(err)
        else console.log(student.length)
        roomModel.findByIdAndUpdate(
            room_Id,
            { $set: {amount_std: student.length} },
            { new: true },
            (err, updated) => {
                if (err) console.log(err)
                else console.log('Set amount student success')
            }
        )
    }).populate('room');

    res.sendFile(__dirname + '/public/views/manager/add_student_room.html');
})

app.get('/add_student_room/:roomId',async (req,res)=>{
    var room_Id = req.params.roomId;
    await studentModel.find({room:room_Id},(err,student)=>{
        if(err) console.log(err)
        else console.log(student.length)
        roomModel.findByIdAndUpdate(
            room_Id,
            { $set: {amount_std: student.length} },
            { new: true },
            (err, updated) => {
                if (err) console.log(err)
                else console.log('Set amount student success')
            }
        )
    }).populate('room');

    res.sendFile(__dirname + '/public/views/admin/add_student_room.html');
})

app.get('/add_student_room/get-room-info/:roomId',function(req,res){
    var room_Id = req.params.roomId;
    roomModel.findById(room_Id, (err, foundRoom) => {
        if (err) console.log(err)
        else res.send(foundRoom);
    })
})

app.get('/add_student_room_manager/get-room-info/:roomId',function(req,res){
    var room_Id = req.params.roomId;
    roomModel.findById(room_Id, (err, foundRoom) => {
        if (err) console.log(err)
        else res.send(foundRoom);
    })
})

app.get('/detail_room/get-room-info/:roomId',function(req,res){
    var room_Id = req.params.roomId;
    roomModel.findById(room_Id, (err, foundRoom) => {
        if (err) console.log(err)
        else res.send(foundRoom);
    })
})

app.post('/creatRoom',async function(req,res){
    const room_id = req.body.room_id;
    const building = req.body.building
    const room_gender = req.body.room_gender;
    const room_price = req.body.room_price;
    const room_status = req.body.room_status;
    
    newManager = await roomModel.create({room_id: room_id, building: building, room_gender:room_gender,room_price:room_price,room_status:room_status});
    res.json({
        success:true,
        message:'Add new room success'
    })
});

app.get('/manage_rooms',(req,res)=>{
    res.sendFile(__dirname + '/public/views/admin/manage_rooms.html')
})


app.get('/room_map',(req,res)=>{
    res.sendFile(__dirname + '/public/views/room_map.html');
})

app.delete('/delete_room/:RoomId', (req, res) => {
    var roomId = req.params.RoomId;
    roomModel.findByIdAndDelete(roomId,(err, deteled) => {
            if (err) res.status(500).json({ success: 0, message: err })
            else res.json({ success: 1, message: "Delete success!!" });
        }
    )
})


app.get('/get_rooms',async (req,res)=>{

    await roomModel.find((err,rooms)=>{
        if(err) console.log(err)
        else res.send(rooms);
    })
})

app.get("/add_room_form",(req,res)=>{
    res.sendFile(__dirname + '/public/views/admin/add_room_form.html')
})

///////Student/////////////////
app.get('/signup_student',(req,res)=>{
    res.sendFile(__dirname + '/public/views/student/signup_student.html')
})
////Manage fee
app.get('/get_student_fee', async (req,res)=>{
    await receiptModel.find((err,receipt)=>{
        if(err) console.log(err)
        else res.send(receipt)
    }).populate('room').populate('student');
})