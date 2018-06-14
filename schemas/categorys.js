/**
 * Created by Jason on 2018/5/4.
 */
/**
 * Created by Jason on 2018/4/28.
 */
var mongoose = require('mongoose');

// 分类表结构
module.exports = new mongoose.Schema({
    // 分类名
    categoryName: String,
    // 关联字段 用户id
    user:{
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'User'
    },
    addTime: {
        type: Date,
        default: ''
    },
    counts: Number,
    notes: String,
})