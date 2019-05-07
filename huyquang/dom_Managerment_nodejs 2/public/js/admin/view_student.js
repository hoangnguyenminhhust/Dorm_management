var student_Id = window.location.href.split('/')[window.location.href.split('/').length - 1];
    $.ajax({
        url: `get-student-info/${student_Id}`,
        type: 'get',
        success: function(response) {
                $("#account").text(response.account);
                $("#password").text(response.password);
                $("#fullname").text(response.fullname);
                $("#gender").text(response.gender);
                $("#branch").text(response.branch);
                $("#course").text(response.course);
                $("#identifycard").text(response.identifycard);
                $("#email").text(response.email);
                $("#dienchinhsachuutientheoquydinh").text(response.dienchinhsachuutientheoquydinh);
                $("#dienkhac").text(response.dienkhac);
                $("#doanthe").text(response.doanthe);
                $("#hoatdongxahoi").text(response.hoatdongxahoi);
                $("#sotruong_nangkhieu").text(response.sotruong_nangkhieu);
                $("#phone_number").text(response.phone_number);
                $("#birth").text(response.birth);
                $("#khicanbaocho_ong_ba").text(response.khicanbaocho_ong_ba);
                $("#dienthoaiong_ba").text(response.dienthoaiong_ba);
                $("#email_ong_ba").text(response.email_ong_ba);
        },
        error: function(err) {
            console.log(err);
        }
    })