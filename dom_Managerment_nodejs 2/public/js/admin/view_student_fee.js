var student_Id = window.location.href.split('/')[window.location.href.split('/').length - 1];
    $.ajax({
        url: `get-fee-info/${student_Id}`,
        type: 'get',
        success: function(response) {
                $("#account").text(response.student.account);
                $("#course").text(response.student.course);
                $("#user_status").text(response.student.user_status);
                $("#fee_room").text(response.fee_room);
                $("#payment_room_status").text(response.payment_room_status);
                $("#fee_living").text(response.fee_living);
                $("#payment_living_status").text(response.payment_living_status);
        },
        error: function(err) {
            console.log(err);
        }
    })