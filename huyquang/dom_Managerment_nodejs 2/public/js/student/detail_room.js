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
$('#detail_fee').on('click',function(){
    $.ajax({
        type:'GET',
        url:'/login_user_info',
        success: function(login_user){
                window.location.href = `/detail_fee/${login_user.id}`;
        }
    });
}); 
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
    },
    error: function (err) {
        console.log(err);
    }
})

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
                    </tr>
                `

            table3.innerHTML = tableHeading + managerHTML3.join('');
        },
        error: function (err) {
            console.log(err);
        }
    })
}


