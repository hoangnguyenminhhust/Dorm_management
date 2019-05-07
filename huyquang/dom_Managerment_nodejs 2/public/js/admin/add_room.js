$(document).ready(function(){
    $('.add_room_form').on('submit',function(e){
        e.preventDefault();
        const room_id = $('.room_id').val();
        const building = $('.building').val();
        const room_gender = $('.room_gender').val();
        const room_price = $('.room_price').val();
        const room_status = $('.room_status').val();
        $.ajax({
            type:"POST",
            url: "/creatRoom",
            data: {
                room_id:room_id,
                building: building,
                room_gender:room_gender,
                room_price:room_price,
                room_status:room_status
            },
            success: function(res){
                console.log(res);
                window.location.href="/manage_rooms";
            },
            error: function(__xhr,__statusCode, code){
                console.log(error);
            }
        });
    })
});