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
////////////////////////////////////////
if (document.getElementsByTagName('table')) {
    var table = document.getElementsByTagName('table')[0];
    $.ajax({
        url: '/get_manager',
        type: 'get',
        success: function(response) {
            managerHTML = response.map(
                data => `
                    <tr>
                    <td>${ data.username }</td>
                    <td>${ data.fullname }</td> 
                    <td>${ data.identifyCard }</td>
                    <td>${ data.phone }</td>
                    <td>${ data.email }</td>
                    <td>${ reverseString(convertDate(data.birth).dateFormat2)}</td>
                    <td><button class ="editButton" data-id="${ data._id }"> sửa</button>|<button class="deleteButton" data-id="${ data._id }">xóa</button></td>
                    </tr>
                `
            );
            
            let tableHeading = `
                <tr>
                <th>Tên người dùng</th>
                <th>Tên đầy đủ</th> 
                <th>CMND</th>
                <th>Số ĐT</th>
                <th>Email</th>
                <th>Sinh nhật</th>
                <th>#</th>
                </tr>
            `
            
            table.innerHTML = tableHeading + managerHTML.join('');
            

            if (document.getElementsByClassName('deletebutton')) {
                var buttonListDelete = document.getElementsByClassName('deleteButton');
                for (let i = 0; i < buttonListDelete.length; i++) {
                    buttonListDelete[i].onclick = function() {
                        $.ajax({
                            url: `/delete_manager/${ buttonListDelete[i].dataset.id }`,
                            type: 'delete',
                            success: function(deleted) {
                                window.location.href = '/manage_manager';
                            },
                            error: function(error) {
                                console.log(error);
                            }
                        })
                    }
                }
            
            }
            if (document.getElementsByClassName('editbutton')) {
                var buttonListEdit = document.getElementsByClassName('editButton');
                for(let i =0; i < buttonListEdit.length;i++){
                    buttonListEdit[i].onclick = function(){
                        window.location.href=`/edit_manager/${ buttonListEdit[i].dataset.id }`;

                    }
                }
            }
        },
        error: function(err) {
            console.log(err);
        }
    })
}