if (document.getElementsByTagName('table')) {
    var table = document.getElementsByTagName('table')[0];
    $.ajax({
        url: '/get_rooms',
        type: 'get',
        success: function(response) {
            managerHTML = response.map(
                data => `
                    <tr>
                    <td>${ data.room_id }</td>
                    <td>${ data.building }</td>
                    <td>${ data.room_gender }</td>
                    <td>${ data.amount_std }</td>
                    <td>${ data.room_price }</td>
                    <td>${ data.room_status }</td>
                    <td><button class ="addButton" data-id="${ data._id }"> thêm</button>|<button class="deleteButton" data-id="${ data._id }">xóa</button></td>
                    </tr>
                `
            );
            let tableHeading = `
                <tr>
                <th>Mã phòng</th>
                <th>Tóa nhà</th>
                <th>Kiểu phòng</th>
                <th>Số lượng</th>
                <th>Giá phòng</th>
                <th>Trạng thái phòng</th>
                <th>#</th>
                </tr>
            `
            table.innerHTML = tableHeading + managerHTML.join('');
            
            if (document.getElementsByClassName('deletebutton')) {
                var buttonListDelete = document.getElementsByClassName('deleteButton');
                for (let i = 0; i < buttonListDelete.length; i++) {
                    buttonListDelete[i].onclick = function() {
                        $.ajax({
                            url: `/delete_room/${ buttonListDelete[i].dataset.id }`,
                            type: 'delete',
                            success: function(deleted) {
                                window.location.href = '/manage_room_manager';
                            },
                            error: function(error) {
                                console.log(error);
                            }
                        })
                    }
                }
            
            }
            if (document.getElementsByClassName('addButton')) {
                var buttonListAdd = document.getElementsByClassName('addButton');
                for(let i =0; i < buttonListAdd.length;i++){
                    buttonListAdd[i].onclick = function(){
                        window.location.href=`/add_student_room_manager/${ buttonListAdd[i].dataset.id }`;
                    }
                }
            }
            $('#findRoom').on('click', function(event) {

                event.preventDefault();
                var findRoom = [];

                if ($("input[name ='building']:checked").val()) {
                    for (let k = 0; k < response.length; k++) {
                        if (response[k].building != $("input[name ='building']:checked").val()) {
                            findRoom.push(response[k]);
                        }
                    }
                } 
                if ($("input[name ='status']:checked").val()) {
                    for (let k = 0; k < response.length; k++) {
                        if (response[k].room_status != $("input[name ='status']:checked").val() && !findRoom.includes(response[k])) {
                            findRoom.push(response[k]);
                        }
                    }
                }
                if ($("input[name ='amount']:checked").val()) {
                    for (let k = 0; k < response.length; k++) {
                        if ($("input[name ='amount']:checked").val() == 'enough' && response[k].amount_std < 5  && !findRoom.includes(response[k])) {
                            findRoom.push(response[k]);
                        } else if ($("input[name ='amount']:checked").val() == 'not_enough' && response[k].amount_std == 5 && !findRoom.includes(response[k])) {
                            findRoom.push(response[k]);
                        }
                    }
                }
                if ($("input[name ='price']:checked").val()) {
                    for (let k = 0; k < response.length; k++) {
                        if (response[k].room_price != $("input[name ='price']:checked").val() && !findRoom.includes(response[k])) {
                            findRoom.push(response[k]);
                        }
                    }
                }
                if ($("input[name ='gender']:checked").val()) {
                    for (let k = 0; k < response.length; k++) {
                        if (response[k].room_gender != $("input[name ='gender']:checked").val()  && !findRoom.includes(response[k])) {
                            findRoom.push(response[k]);
                        }
                    }
                }
                deletedRoom = findRoom.map(
                    data => `
                    <tr>
                    <td>${ data.room_id }</td>
                    <td>${ data.building }</td>
                    <td>${ data.room_gender }</td>
                    <td>${ data.amount_std }</td>
                    <td>${ data.room_price }</td>
                    <td>${ data.room_status }</td>
                    <td><button class ="addButton" data-id="${ data._id }"> thêm</button>|<button class="deleteButton" data-id="${ data._id }">xóa</button></td>
                    </tr>
                `
                );
                var exRoom = managerHTML.join('');
                for (a = 0; a < deletedRoom.length; a++) {
                    exRoom = exRoom.replace(deletedRoom[a], '');
                }
                table.innerHTML = tableHeading + exRoom;

                if (document.getElementsByClassName('deletebutton')) {
                    var buttonListDelete = document.getElementsByClassName('deleteButton');
                    for (let i = 0; i < buttonListDelete.length; i++) {
                        buttonListDelete[i].onclick = function() {
                            $.ajax({
                                url: `/delete_room/${ buttonListDelete[i].dataset.id }`,
                                type: 'delete',
                                success: function(deleted) {
                                    window.location.href = '/manage_room_manager';
                                },
                                error: function(error) {
                                    console.log(error);
                                }
                            })
                        }
                    }
                
                } 
                if (document.getElementsByClassName('addButton')) {
                    var buttonListAdd = document.getElementsByClassName('addButton');
                    for(let i =0; i < buttonListAdd.length;i++){
                        buttonListAdd[i].onclick = function(){
                            window.location.href=`/add_student_room_manager/${ buttonListAdd[i].dataset.id }`;
                        }
                    }
                }
            })
        },
        error: function(err) {
            console.log(err);
        }
    })
}