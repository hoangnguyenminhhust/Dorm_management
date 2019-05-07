//Reverse 
function reverseString(str) {
    var splitString = str.split("-");
    var reverseArray = splitString.reverse(); 
    var joinArray = reverseArray.join("/");
    return joinArray;
}

//Date convert
var convertDate = function(date){
    var date = date.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})/);
    if(date == null){
        return false;   
    }else{
        var dateObj = {
            dateFormat1 : date[3] + '.' + date[2] + '.' + date[1],
            dateFormat2 : date[1] + '-' + date[2] + '-' + date[3],
            dateFormat3 : date[2] + '/' + date[3] + '/' + date[1],
            time : date[4] + ':' + date[5] + ':' + date[6],
        };
        return dateObj;
    }
};
/////
var room_Id = window.location.href.split('/')[window.location.href.split('/').length - 1];
$.ajax({
    url: `get-room-info/${room_Id}`,
    type: 'get',
    success: function (response) {
        $("#room_id").text(response.room_id);
        $("#building").text(response.building);
        $("#room_gender").text(response.room_gender);
        $("#amount_std").text(response.amount_std);
        $("#room_price").text(response.room_price);
        $("#room_status").text(response.room_status);
    room_price = response.room_price;
    },
    error: function (err) {
        console.log(err);
    }
})
/////////////////////////////////////////////
if (document.getElementById('table_1')) {
    var table = document.getElementsByClassName('table_1')[0];
    $.ajax({
        url: '/get_approved_request',
        type: 'get',

        success: function (response) {
            managerHTML = response.map(
                data => `
                        <tr>
                        <td>${ data.student.fullname}</td>
                        <td>${ data.student.gender}</td> 
                        <td>${ data.student.course}</td>
                        <td>${ data.request_status}</td>
                        <td>${ data.student.user_status}</td>
                        <td>${ data.approver}</td>
                        <td>${reverseString(convertDate(data.date_approve).dateFormat2)}</td>
                        <td><button class ="pushButton" data-studentstatus="${data.student.user_status}" data-id="${ data.student._id }">thêm</button></td>
                        </tr>
                    `
            );

            let tableHeading = `
                    <tr>
                    <th>Tên sinh viên</th>
                    <th>Giới tính</th> 
                    <th>Khóa</th>
                    <th>Trạng thái yêu cầu</th>
                    <th>Trạng thái sinh viên</th>
                    <th>Người duyệt</th>
                    <th>Ngày duyệt</th>
                    <th>#</th>
                    </tr>
                `

            table.innerHTML = tableHeading + managerHTML.join('');

            if (document.getElementsByClassName('pushbutton')) {
                var buttonListAdd = document.getElementsByClassName('pushButton');
                for (let i = 0; i < buttonListAdd.length; i++) {
                    buttonListAdd[i].onclick = function() {
                        $.ajax({
                            url: `/add_student_room/${buttonListAdd[i].dataset.id}/${room_Id}/${buttonListAdd[i].dataset.studentstatus}`,
                            type: 'post',
                            success: function(pushed) {
                                window.location.href = `/add_student_room_manager/${room_Id}`;
                            },
                            error: function(error) {
                                console.log(error);
                            }
                        })
                    }
                }
            
            }

        },
        error: function (err) {
            console.log(err);
        }
    })
}
/////////////////////////////////////////////////////////////////////////////////////
if (document.getElementById('table_2')) {
    var table2 = document.getElementsByClassName('table_2')[0];
    $.ajax({
        url: `/get_student_room/${room_Id}`,
        type: 'get',

        success: function (response) {
            managerHTML = response.map(
                data => `
                        <tr>
                        <td>${ data.fullname}</td>
                        <td>${ data.gender}</td> 
                        <td>${ data.course}</td>
                        <td>${ data.user_status}</td>
                        <td>${ data.approver}</td>
                        <td>${ reverseString(convertDate(data.date_approve).dateFormat2)}</td>
                        <td>${ data.date_valid}</td>
                        <td><button class ="addButton" data-id="${ data._id }">duyệt</button>|<button class="ignoreButton" data-id="${ data._id }">loại</button></td>
                        </tr>
                    `
            );

            let tableHeading = `
                    <tr>
                    <th>Tên sinh viên</th>
                    <th>Giới tính</th> 
                    <th>Khóa</th>
                    <th>Trạng thái sinh viên</th>
                    <th>Người duyệt</th>
                    <th>Ngày duyệt</th>
                    <th>Hạn nộp hồ sơ</th>
                    <th>#</th>

                    </tr>
                `

            table2.innerHTML = tableHeading + managerHTML.join('');

            if (document.getElementsByClassName('ignorebutton')) {
                var buttonListIgnore = document.getElementsByClassName('ignoreButton');
                for (let i = 0; i < buttonListIgnore.length; i++) {
                    buttonListIgnore[i].onclick = function() {
                        $.ajax({
                            url: `/ignore_status_student/${ buttonListIgnore[i].dataset.id }/${room_Id}`,
                            type: 'post',
                            success: function(ignored) {
                                window.location.href = `/add_student_room_manager/${room_Id}`;
                            },
                            error: function(error) {
                                console.log(error);
                            }
                        })
                    }
                }
            
            }

            if (document.getElementsByClassName('addbutton')) {
                var buttonListAdd = document.getElementsByClassName('addButton');
                for (let i = 0; i < buttonListAdd.length; i++) {
                    buttonListAdd[i].onclick = function() {
                        $.ajax({
                            url: `/add_status_student/${ buttonListAdd[i].dataset.id }/${room_Id}/${room_price}`,
                            type: 'post',
                            success: function(added) {
                                window.location.href = `/add_student_room_manager/${room_Id}`;
                            },
                            error: function(error) {
                                console.log(error);
                            }
                        })
                    }
                }
            
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}
//////////////////////////////////////////////////////////////////////////////

if (document.getElementById('table_3')) {
    var table3 = document.getElementsByClassName('table_3')[0];
    $.ajax({
        url: `/get_student_available_room/${room_Id}`,
        type: 'get',

        success: function (response) {
            managerHTML3 = response.map(
                data => `
                <tr>
                        <td>${ data.student.fullname}</td>
                        <td>${ data.student.gender}</td> 
                        <td>${ data.student.course}</td>
                        <td>${ data.payment_room_status}</td>
                        <td>${ reverseString(convertDate(data.student.date_approve).dateFormat2)}</td>
                        <td>${ reverseString(convertDate(data.student.date_valid_room).dateFormat2)}</td>
                        <td><button class ="detailButton" data-id="${ data.student._id }">chi tiết</button>|<button class="changeButton" data-id="${ data.student._id }">chuyển phòng</button>|<button class="extendButton" data-id="${ data.student._id }">ra hạn</button></td>
                        <tr>
                    `
            );

            let tableHeading = `
                    <tr>
                    <th>Tên sinh viên</th>
                    <th>Giới tính</th> 
                    <th>Khóa</th>
                    <th>Trạng thái phí phòng</th>
                    <th>Ngày duyệt</th>
                    <th>Hạn phòng</th>
                    <th>##</th>

                    </tr>
                `

            table3.innerHTML = tableHeading + managerHTML3.join('');

            if (document.getElementsByClassName('detailbutton')) {
                var buttonListDetail = document.getElementsByClassName('detailButton');
                for(let i =0; i < buttonListDetail.length;i++){
                    buttonListDetail[i].onclick = function(){
                        window.location.href=`/view_student_manager/${ buttonListDetail[i].dataset.id }`;

                    }
                }
            }

            

            if (document.getElementsByClassName('changebutton')) {
                var buttonListchange = document.getElementsByClassName('changeButton');
                for (let i = 0; i < buttonListchange.length; i++) {
                    buttonListchange[i].onclick = function() {
                        $.ajax({
                            url: `/change_student/${ buttonListchange[i].dataset.id}/${room_Id}`,
                            type: 'post',
                            success: function(change) {
                                window.location.href = `/add_student_room_manager/${room_Id}`;
                            },
                            error: function(error) {
                                console.log(error);
                            }
                        })
                    }
                }
            
            }

            if (document.getElementsByClassName('extendButton')) {
                var buttonListExtend = document.getElementsByClassName('extendButton');
                for(let i =0; i < buttonListExtend.length;i++){
                    buttonListExtend[i].onclick = function(){
                        window.location.href=`/extend_student_manager/${ buttonListExtend[i].dataset.id }`;

                    }
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}


