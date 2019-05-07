$(document).ready(function(){
    $('#log_out').on('click',function(){
        $.ajax({
            type:"get",
            url:"/log_out",
            success: function(res){
                window.location.href = '/homepage';
                console.log(res);
            },
        })
    });
});