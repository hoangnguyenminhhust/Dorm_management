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
/////
var student_Id = window.location.href.split('/')[window.location.href.split('/').length - 1];
$('.extend-form').on('submit', function (e) {
    e.preventDefault();
    const date_valid_room = $('#date_valid_room').val();
    const date_valid_fee_room = $('#date_valid_fee_room').val();
    const date_valid_fee_living = $('#date_valid_fee_living').val();
    $.ajax({
        type: "POST",
        url: "/create_Valid_date",
        data: {
            student_Id: student_Id,
            date_valid_room: date_valid_room,
            date_valid_fee_room: date_valid_fee_room,
            date_valid_fee_living: date_valid_fee_living
        },
        success: function (res) {
            console.log(res);
            window.location.href = `/extend_student_manager/${student_Id}`
        },
        error: function (__xhr, __statusCode, code) {
            console.log(error);//
        }
    });
})

$.ajax({
    url: `/extend_student/get-student-info/${student_Id}`,
    type: 'get',
    success: function (response) {
        $("#account").text(response.student.account);
        $("#fullname").text(response.student.fullname);
        $("#gender").text(response.student.gender);
        $("#branch").text(response.student.branch);
        $("#course").text(response.student.course);
        $("#email").text(response.student.email);
        $("#phone_number").text(response.student.phone_number);
        $("#birth").text(response.student.birth);
        $("#date_approve").text(reverseString(convertDate(response.student.date_approve).dateFormat2));
        $("#date_valid_room_").text(reverseString(convertDate(response.student.date_valid_room).dateFormat2));
        $("#date_valid_fee_room_").text(reverseString(convertDate(response.date_valid_fee_room).dateFormat2));
        $("#date_valid_fee_living_").text(reverseString(convertDate(response.date_valid_fee_living).dateFormat2));
    },
    error: function (err) {
        console.log(err);
    }
})