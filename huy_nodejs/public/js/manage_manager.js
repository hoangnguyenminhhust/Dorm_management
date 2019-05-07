if (document.getElementsByTagName('table')) {
    var table = document.getElementsByTagName('table')[0];
    $.ajax({
        url: '/get_manager',
        type: 'get',
        success: function(response) {
            managerHTML = response.map(
                data => `
                    <tr>
                    <td>${data.username }</td>
                    <td>${ data.fullname }</td> 
                    <td>${ data.password }</td>
                    <td>${ data.identifyCard }</td>
                    <td>${ data.phone }</td>
                    <td>${ data.email }</td>
                    <td>${ data.birth }</td>
                    <td><button>sửa</button>|<button data-id="${ data._id }">xóa</button></td>
                    </tr>
                `
            );
            let tableHeading = `
                <tr>
                <th>Tên người dùng</th>
                <th>Tên đầy đủ</th> 
                <th>Mật khẩu</th>
                <th>CMND</th>
                <th>Số ĐT</th>
                <th>Email</th>
                <th>Sinh nhật</th>
                <th>#</th>
                </tr>
            `
            table.innerHTML = tableHeading + managerHTML.join('');

            if (document.getElementsByTagName('button')) {
                var buttonList = document.getElementsByTagName('button');
                for (let i = 0; i < buttonList.length; i++) {
                    buttonList[i].onclick = function() {
                        $.ajax({
                            url: `/delete_manager/${ buttonList[i].dataset.id }`,
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
        },
        error: function(err) {
            console.log(err);
        }
    })
}