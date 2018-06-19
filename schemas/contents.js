/**
 * Created by Jason on 2018/4/28.
 */
var mongoose = require('mongoose');

// 用户表结构
module.exports = new mongoose.Schema({
    // 关联字段 分类id
    category:{
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'Category'
    },
    // 关联字段 用户id
    user:{
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'User'
    },
    // 内容标题
    title: String,
    // 内容简介
    description: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    addTime: {
        type: Date,
        default: ''
    },
    // 阅读量
    views: {
        type: Number,
        default: 0
    },
    // 评论
    comments:{
        type:Array,
        default:[],
    }

})