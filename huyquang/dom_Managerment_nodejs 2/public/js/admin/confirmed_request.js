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
if (document.getElementsByTagName('table')) {
    var table = document.getElementsByTagName('table')[0];
    $.ajax({
        url: '/get_confirmed_request',
        type: 'get',
        success: function(response) {
            managerHTML = response.map(
                data => `
                    <tr>
                    <td>${ data.student.fullname }</td>
                    <td>${ data.student.gender }</td> 
                    <td>${ data.student.branch }</td>
                    <td>${ data.student.course }</td>
                    <td>${ data.student.email }</td>
                    <td>${ data.request_status}</td>
                    <td>${ data.approver }</td>
                    <td>${reverseString(convertDate(data.date_approve).dateFormat2)}</td>
                    </tr>
                `
            );
            
            let tableHeading = `
                <tr>
                <th>Tên sinh viên</th>
                <th>Giới tính</th> 
                <th>Khoa</th>
                <th>Khóa</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Người duyệt</th>
                <th>Ngày duyệt</th>
                </tr>
            `
            
            table.innerHTML = tableHeading + managerHTML.join('');
            
        },
        error: function(err) {
            console.log(err);
        }
    })
}