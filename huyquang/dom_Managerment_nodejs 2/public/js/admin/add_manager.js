$(document).ready(function(){
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
                window.location.href="/manage_manager";
            },
            error: function(__xhr,__statusCode, code){
                console.log(error);
            }
        });
    })
});