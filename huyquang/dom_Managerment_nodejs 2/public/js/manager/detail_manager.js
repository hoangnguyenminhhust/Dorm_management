
var student_Id = window.location.href.split('/')[window.location.href.split('/').length - 1];
$.ajax({
    type: 'GET',
    url: '/login_user_info',
    success: function (response) {
        $("#account").text(response.username);
        $("#fullname").text(response.fullname);
        $("#gender").text(response.gender);
        $("#branch").text(response.branch);
        $("#course").text(response.course);
        $("#identifycard").text(response.identifycard);
        $("#email").text(response.email);
        $("#phone_number").text(response.phone_number);
        $("#birth").text(response.birth);
    }
});
