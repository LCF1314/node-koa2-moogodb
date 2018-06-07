/**
 * Created by Jason on 2018/5/4.
 */
var mongoose = require('mongoose');
var contentSchema = require('../schemas/contents');
module.exports = mongoose.model('Content', contentSchema);