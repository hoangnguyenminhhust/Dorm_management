$(document).ready(function(){
    console.log('jquery loaded');
    $('.login-form').on('submit', function(e){
        e.preventDefault();
        const username = $('.username').val();
        const password = $('.password').val();
        $.ajax({
            type: "POST",
            url: "/login_admin",
            data: {
                username: username,
                password: password
            },
            success: function (response) {
                console.log(response);
                window.location.href = '/homepage_admin'
            },
            error: function(__xhr,__statusCode,error){
                console.log(error);
            } 
        });
    })
});