if (document.getElementsByTagName('table')) {
    var table = document.getElementsByTagName('table')[0];
    $.ajax({
        url: '/get_request',
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
                    <td><button class ="addButton" data-id="${ data._id }">thêm</button>|<button class="ignoreButton" data-id="${ data._id }">loại</button></td>
                    <td><button class ="viewButton" data-id="${ data.student._id }">xem hồ sơ</button></td>
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
                <th>#</th>
                <th>##</th>
                </tr>
            `
            
            table.innerHTML = tableHeading + managerHTML.join('');
            

            if (document.getElementsByClassName('ignorebutton')) {
                var buttonListIgnore = document.getElementsByClassName('ignoreButton');
                for (let i = 0; i < buttonListIgnore.length; i++) {
                    buttonListIgnore[i].onclick = function() {
                        $.ajax({
                            url: `/ignore_request/${ buttonListIgnore[i].dataset.id }`,
                            type: 'post',
                            success: function(deleted) {
                                window.location.href = '/manage_request';
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
                            url: `/add_request/${ buttonListAdd[i].dataset.id }`,
                            type: 'post',
                            success: function(deleted) {
                                window.location.href = '/manage_request';
                            },
                            error: function(error) {
                                console.log(error);
                            }
                        })
                    }
                }
            
            }

            if (document.getElementsByClassName('viewbutton')) {
                var buttonListView = document.getElementsByClassName('viewButton');
                for(let i =0; i < buttonListView.length;i++){
                    buttonListView[i].onclick = function(){
                        window.location.href=`/view_student/${ buttonListView[i].dataset.id }`;

                    }
                }
            }
        },
        error: function(err) {
            console.log(err);
        }
    })
}