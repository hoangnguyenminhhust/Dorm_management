//Reverse 
function reverseString(str) {
    var splitString = str.split("-");
    var reverseArray = splitString.reverse(); 
    var joinArray = reverseArray.join("-");
    return joinArray;
}

//Date convert
var convertDate = function(date){
    var date = date.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})/);
    if(date == null){
        return false;   
    }else{
        var dateObj = {
            dateFormat1 : date[3] + '.' + date[2] + '.' + date[1],
            dateFormat2 : date[1] + '-' + date[2] + '-' + date[3],
            dateFormat3 : date[2] + '/' + date[3] + '/' + date[1],
            time : date[4] + ':' + date[5] + ':' + date[6],
        };
        return dateObj;
    }
};
var managerId = window.location.href.split('/')[window.location.href.split('/').length - 1];

$.ajax({
    url: `get-manager-info/${ managerId }`,
    type: 'get',
    success: function(response) {
        document.getElementById('username_manager').value = response.username;
        document.getElementById('fullname').value = response.fullname;
        document.getElementById('password_manager').value = response.password;
        document.getElementById('identifyCard').value = response.identifyCard;
        document.getElementById('phone').value = response.phone;
        document.getElementById('email').value = response.email;
        document.getElementById('birth').value =convertDate(response.birth).dateFormat2;

        document.getElementById('submit').onclick = function(event) {
            event.preventDefault();
            var username = document.getElementById('username_manager').value;
            var fullname = document.getElementById('fullname').value;
            var password = document.getElementById('password_manager').value;
            var identifyCard = document.getElementById('identifyCard').value;
            var phone = document.getElementById('phone').value;
            var email = document.getElementById('email').value;
            var birth = document.getElementById('birth').value;

            $.ajax({
                url: '/updateManager',
                type: 'post',
                data: {
                    id: response._id,
                    username: username,
                    fullname: fullname,
                    password: password,
                    identifyCard: identifyCard,
                    phone: phone,
                    email: email,
                    birth: birth,
                },
                success: function(res) {
                    window.location.href = `/manage_manager`;
                } 
            })
        }
    },
    error: function(err) {
        console.log(err);
    }
})

