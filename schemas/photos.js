/**
 * Created by Jason on 2018/4/28.
 */
var mongoose = require('mongoose');

// 用户表结构
module.exports = new mongoose.Schema({
    // 用户名
    filePath: String,
    fileName: String,
    originalname: String,
    link: String,
})