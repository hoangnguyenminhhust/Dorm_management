//Reverse 
function reverseString(str) {
    var splitString = str.split("-");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("/");
    return joinArray;
}

//Date convert
var convertDate = function (date) {
    var date = date.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})/);
    if (date == null) {
        return false;
    } else {
        var dateObj = {
            dateFormat1: date[3] + '.' + date[2] + '.' + date[1],
            dateFormat2: date[1] + '-' + date[2] + '-' + date[3],
            dateFormat3: date[2] + '/' + date[3] + '/' + date[1],
            time: date[4] + ':' + date[5] + ':' + date[6],
        };
        return dateObj;
    }
};
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
now = '20/05/2019'
$.ajax(

    // $("#date_now").text(today)

    $("#date_now").text(now)

)
////////////////////////////////////////
if (document.getElementsByTagName('table')) {
    var table = document.getElementsByTagName('table')[0];
    $.ajax({
        url: '/get_student_fee',
        type: 'get',
        success: function (response) {
            managerHTML = response.map(
                data => `
                    <tr>
                    <td>${ data.student.fullname}</td>
                    <td>${ data.fee_room}</td>
                    <td>${ data.fee_living}</td>
                    <td>${ reverseString(convertDate(data.student.date_valid_room).dateFormat2)}</td>
                    <td>${ reverseString(convertDate(data.date_valid_fee_room).dateFormat2)}</td>
                    <td>${ data.student.user_status}</td>
                    <td><input type="checkbox" name="name[]" id ="check_all" value="${data.student._id}" ></td>
                    <th><input type="button" data-id="${data.student._id}" class="extendButton" value="Ra hạn"/><input data-id="${data.student._id}" type="button" class="detailButton" value="Chi tiết hóa đơn"/></th>
                    </tr>
                `
            );

            let tableHeading = `
                <tr>
                <th>Tên sinh viên</th>
                <th>Phí phòng</th>
                <th>Phí sinh hoạt</th>
                <th>Hạn sử dụng phòng</th>
                <th>Hạn đóng phí phòng</th>
                <th>Trạng thái sinh viên</th>
                <th><input type="button" id="btn1" value="Chọn hết"/><input type="button" id="btn2" value="Bỏ Chọn"/></th>
                <th>#</th>
                </tr>
            `

            table.innerHTML = tableHeading + managerHTML.join('');


            // Chức năng chọn hết
            document.getElementById("btn1").onclick = function () {
                var checkboxes = document.getElementsByName('name[]');
                for (var i = 0; i < checkboxes.length; i++) {
                    checkboxes[i].checked = true;
                }
            };

            // Chức năng bỏ chọn hết
            document.getElementById("btn2").onclick = function () {
                var checkboxes = document.getElementsByName('name[]');
                for (var i = 0; i < checkboxes.length; i++) {
                    console.log(checkboxes.length)
                    checkboxes[i].checked = false;
                }
            };

            document.getElementById("notify_room_fee").onclick = function () {
                var checkboxes = document.getElementsByName('name[]');
                for (var i = 0; i < checkboxes.length; i++) {
                    data_student = []
                    if (checkboxes[i].checked) {
                        $.ajax({
                            type: "POST",
                            url: "/update_room_fee",
                            data:{
                            data_student:checkboxes[i].value
                            },
                            
                            success: function (res) {
                                window.location.href = "/manage_fee"
                            },
                            error: function (__xhr, __statusCode, code) {
                                console.log(error);//
                            }
                        });
                    }
                }
            }

            document.getElementById("notify_valid_room").onclick = function () {
                var checkboxes = document.getElementsByName('name[]');
                for (var i = 0; i < checkboxes.length; i++) {
                    data_student = []
                    if (checkboxes[i].checked) {
                        $.ajax({
                            type: "POST",
                            url: "/update_valid_room",
                            data:{
                            data_student:checkboxes[i].value
                            },
                            
                            success: function (res) {
                                window.location.href = "/manage_fee"
                            },
                            error: function (__xhr, __statusCode, code) {
                                console.log(error);//
                            }
                        });
                    }
                }
            }

            if (document.getElementsByClassName('extendButton')) {
                var buttonListExtend = document.getElementsByClassName('extendButton');
                for(let i =0; i < buttonListExtend.length;i++){
                    buttonListExtend[i].onclick = function(){
                        window.location.href=`/extend_student/${ buttonListExtend[i].dataset.id }`;

                    }
                }
            }
            if (document.getElementsByClassName('detailbutton')) {
                var buttonListDetail = document.getElementsByClassName('detailButton');
                for(let i =0; i < buttonListDetail.length;i++){
                    buttonListDetail[i].onclick = function(){
                        window.location.href=`/view_student/${ buttonListDetail[i].dataset.id }`;

                    }
                }
            }

            var date_now = now.split('/')[0]
            var month_now = now.split('/')[1]
            var year_now = now.split('/')[2]

            $('#find_fee_status').on('click', function (event) {
                event.preventDefault();
                var findRoom = [];
                if ($("input[name ='valid']:checked").val()) {
                    for (let k = 0; k < response.length; k++) {
                        if ($("input[name ='valid']:checked").val() == 'valid_fee' && reverseString(convertDate(response[k].date_valid_fee_room).dateFormat2).split('/')[2] - year_now != 0) {
                            findRoom.push(response[k]);
                        }
                        else if ($("input[name ='valid']:checked").val() == 'valid_fee' && reverseString(convertDate(response[k].date_valid_fee_room).dateFormat2).split('/')[1] - month_now != 0) {
                            findRoom.push(response[k]);
                        }
                        else if ($("input[name ='valid']:checked").val() == 'valid_fee' && reverseString(convertDate(response[k].date_valid_fee_room).dateFormat2).split('/')[0] - date_now != 10) {
                            findRoom.push(response[k]);
                        }
                        else if ($("input[name ='valid']:checked").val() == 'valid_room' && reverseString(convertDate(response[k].student.date_valid_room).dateFormat2).split('/')[2] - year_now != 0) {
                            findRoom.push(response[k]);
                        }
                        else if ($("input[name ='valid']:checked").val() == 'valid_room' && reverseString(convertDate(response[k].student.date_valid_room).dateFormat2).split('/')[1] - month_now != 1) {
                            findRoom.push(response[k]);
                        }
                    }
                }

                deletedRoom = findRoom.map(
                    data => `
                    <tr>
                    <td>${ data.student.fullname}</td>
                    <td>${ data.fee_room}</td>
                    <td>${ data.fee_living}</td>
                    <td>${ reverseString(convertDate(data.student.date_valid_room).dateFormat2)}</td>
                    <td>${ reverseString(convertDate(data.date_valid_fee_room).dateFormat2)}</td>
                    <td>${ data.student.user_status}</td>
                    <td><input type="checkbox" name="name[]" id ="check_all" value="${data.student._id}" ></td>
                    <th><input type="button" data-id="${data.student._id}" class="extendButton" value="Ra hạn"/><input data-id="${data.student._id}" type="button" class="detailButton" value="Chi tiết hóa đơn"/></th>
                    </tr>
                `
                );
                var exRoom = managerHTML.join('');
                for (a = 0; a < deletedRoom.length; a++) {
                    exRoom = exRoom.replace(deletedRoom[a], '');
                }
                table.innerHTML = tableHeading + exRoom;

                ////////////////////////////////////////////////////////////////
                if (document.getElementsByClassName('extendButton')) {
                    var buttonListExtend = document.getElementsByClassName('extendButton');
                    for(let i =0; i < buttonListExtend.length;i++){
                        buttonListExtend[i].onclick = function(){
                            window.location.href=`/extend_student/${ buttonListExtend[i].dataset.id }`;
    
                        }
                    }
                }
                if (document.getElementsByClassName('detailbutton')) {
                    var buttonListDetail = document.getElementsByClassName('detailButton');
                    for(let i =0; i < buttonListDetail.length;i++){
                        buttonListDetail[i].onclick = function(){
                            window.location.href=`/view_student/${ buttonListDetail[i].dataset.id }`;
    
                        }
                    }
                }
                document.getElementById("btn1").onclick = function () {
                    var checkboxes = document.getElementsByName('name[]');
                    for (var i = 0; i < checkboxes.length; i++) {
                        checkboxes[i].checked = true;
                    }
                };

                document.getElementById("btn2").onclick = function () {
                    var checkboxes = document.getElementsByName('name[]');
                    for (var i = 0; i < checkboxes.length; i++) {
                        checkboxes[i].checked = false;
                    }
                };

            })
        },
        error: function (err) {
            console.log(err);
        }
    })
}