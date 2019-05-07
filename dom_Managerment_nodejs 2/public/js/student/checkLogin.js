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
                window.location.href = '/login_student';
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

$('#detail_fee').on('click',function(){
    $.ajax({
        type:'GET',
        url:'/login_user_info',
        success: function(login_user){
                window.location.href = `/detail_fee/${login_user.id}`;
        }
    });
});
$('#detail_room').on('click',function(){
    $.ajax({
        type:'GET',
        url:'/login_user_info',
        success: function(login_user){
                window.location.href = `/detail_room/${login_user.room}`;
        }
    });
});