/**
 * Created by Jason on 2018/5/2.
 */
var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');
module.exports = mongoose.model('User', usersSchema);