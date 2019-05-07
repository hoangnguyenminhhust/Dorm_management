$(document).ready(function(){
    console.log('jquery loaded');
    $.ajax({
        type:'GET',
        url:'/login_user_info',
        success: function(login_user){
            if(login_user){
                $("#username").text(login_user.username);
                $("#id_user").text(login_user.id);
            }else{
                window.location.href = '/login';
            }
        }
    });
    $('.add_manager_form').on('submit',function(e){
        e.preventDefault();

        const username = $('.username').val();
        const password = $('.password').val();
        const fullname = $('.fullname').val();
        const identifyCard = $('.identifyCard').val();
        const phone = $('.phone').val();
        const email = $('.email').val();
        const birth = $('.birth').val();

        
        $.ajax({
            type:"POST",
            url: "/creatManager",
            data: {
                username: username,
                password: password,
                fullname: fullname,
                identifyCard: identifyCard,
                phone: phone,
                email: email,
                birth: birth
            },
            success: function(res){
                console.log(res);
            },
            error: function(__xhr,__statusCode, code){
                console.log(error);
            }
        });
    })
});