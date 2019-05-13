'use strict'
module.exports = function (app) {
    var user = require('../controller/maincontroller');

app.route('/finduser')
    .get(user.read_a_user)

app.route('/updateuser')
    .put(user.update_a_user)

app.route('/deleteuser')
    .delete(user.delete_a_user)
};
