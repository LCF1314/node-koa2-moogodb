/**
 * Created by Jason on 2018/5/2.
 */
var mongoose = require('mongoose');
var categorySchema = require('../schemas/categorys');
module.exports = mongoose.model('Category', categorySchema);