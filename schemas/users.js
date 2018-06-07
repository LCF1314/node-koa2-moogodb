/**
 * Created by Jason on 2018/4/28.
 */
var mongoose = require('mongoose');

// 用户表结构
module.exports = new mongoose.Schema({
    // 用户名
    username: String,
    // 密码
    password: String,
    // 是否是管理员
    isAdmin: {
        type: Boolean,
        default: false,
    },
    addTime: {
        type: String,
        default: ''
    },
    loginTime: {
        type: String,
        default: ''
    },
    loginCounts: {
        type: Number,
        default: 0
    },
    loginIp: String,
    lastLoginTime: {
        type: String,
        default: ''
    },
})