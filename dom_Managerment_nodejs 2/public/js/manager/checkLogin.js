$(document).ready(function(){
    console.log('jquery loaded');
    $.ajax({
        type:'GET',
        url:'/login_user_info',
        success: function(login_user){
            if(login_user){
                $("#username").text(login_user.username);
            }else{
                window.location.href = '/login_manager';
            }
        }
    });
});
$('#log_out').on('click',function(){
    $.ajax({
        type:"GET",
        url:"/log_out",
        success: function(res){
            window.location.href = '/homepage';
            console.log(res);
        }
    })
});
$('#information').on('click',function(){
    $.ajax({
        type:'GET',
        url:'/login_user_info',
        success: function(login_user){
                window.location.href = `/detail_manager/${login_user.id}`;
        }
    });
});