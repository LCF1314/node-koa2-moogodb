/**
 * Created by Jason on 2018/4/28.
 */
/**
 * Created by Jason on 2018/4/28.
 */
const _ = require('lodash');
const router = require('koa-router');
const User = require('../models/user')
// const Content = require('../models/Content')
// 同一返回格式

// //评论提交
// router.post('/comment/view', function (req,res,next) {
//     const contentId = req.body.contentId || '';
//     const postData = {
//         username: req.userInfo.username,
//         postTime: new Date(),
//         content: req.body.content
//     }
// })
// // 获取指定文章的评论
// router.get('/comment', function (req,res,next) {
//     const contentId = req.query.contentId || '';
//     Content.findOne({
//         _id:contentId
//     }).then(function (newContent) {
//         responseData.result = newContent;
//         res.json(responseData);
//     })
// })
const responseData = {}
const user =  {
    register: async (ctx) => {
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;
        const repassword = ctx.request.body.repassword;
        const addTime = ctx.request.body.addTime;
        const loginCounts = 0;
        /*
            if(username == ''){
                responseData.error.code = 1;
                responseData.error.message = '用户名不能为空！';
                return responseData;
            }
            if(password == ''){
                responseData.error.code = 2;
                responseData.error.message = '密码不能为空！';
                return responseData;
            }
            if(repassword == ''){
                responseData.error.code = 3;
                responseData.error.message = '验证密码不能为空！';
                return responseData;
            }
            if(repassword != password){
                responseData.error.code = 4;
                responseData.error.message = '两次输入的密码不一致！';
                return responseData;
            }
        */
        if(await User.findOne({username: username})){
            responseData.error = {};
            ctx.response.status = 500;
            responseData.error.code = 5;
            responseData.error.message = '该名称已被占用！请重新输入用户名！';
            return responseData;
        }
        responseData.result = {};
        // 用户名是否已经被注册了，如果存在和用户名相同的数据，提示用户名已注册
        const userInfo = await new User({
            username: username,
            password: password,
            addTime: addTime,
            loginCounts: 0
        }).save();
        responseData.result.data = {
            _id: userInfo._id,
            username: userInfo.username
        };
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '注册成功。';
        responseData.result.status = 'success';
        return responseData;
    },
    login: async (ctx) => {
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;
        const loginTime = ctx.request.body.loginTime;
        const lastLoginTime = ctx.request.body.lastLoginTime;
        const loginIp = ctx.request.body.loginIp;
        const userInfo = await User.findOne({username: username,password: password});
        
        if(!userInfo){
            responseData.error = {};
            ctx.response.status = 500;
            responseData.error.code = 0;
            responseData.error.message = '用户名或密码错误!!!';
            return responseData;
        }
        
        if(!userInfo.loginTime && !userInfo.lastLoginTime){
            const user = await User.update({_id: userInfo._id},{loginTime:loginTime,lastLoginTime:loginTime});
            userInfo.lastLoginTime = loginTime;
        }else if(userInfo.lastLoginTime){
            const user = await User.update({_id: userInfo._id},{lastLoginTime:loginTime});
        } 
        const userOne = await User.update({_id: userInfo._id},{loginCounts:userInfo.loginCounts + 1,loginIp:loginIp});
        responseData.result = {};
        responseData.result.data = {
            _id: userInfo._id,
            username: userInfo.username,
            lastLoginTime: userInfo.lastLoginTime,
            loginCounts: userInfo.loginCounts + 1,
            loginIp: loginIp,
            isAdmin: userInfo.isAdmin,
        };
        ctx.userInfo = userInfo;
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '登录成功。';
        responseData.result.status = 'success';
        return responseData;
    },
    update: async (ctx) => {
        const user = await User.update({_id: ctx.request.body._id},ctx.request.body);
        responseData.result = {};
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '修改成功。';
        responseData.result.status = 'success';
        return responseData;
    },
    delete: async (ctx) => {
        const user = await User.remove({_id: ctx.request.body._id});
        responseData.result = {};
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '删除成功。';
        responseData.result.status = 'success';
        return responseData;
    },
    bulkDelete: async (ctx) => {
        const user = await User.remove({_id: {$in: ctx.request.body.ids}});
        responseData.result = {};
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '批量删除成功。';
        responseData.result.status = 'success';
        return responseData;
    },
    userInfo: async (ctx) => {
        const postData = {
            pageIndex: Number(ctx.request.body.pageIndex),
            pageSize: Number(ctx.request.body.pageSize),
            pageIndexs: 0,
            categorys: [],
            counts: 0,
        }
        postData.counts = await User.count();
        postData.pageIndexs = Math.ceil(postData.counts / postData.pageSize);
        // 取值不能超过pageIndexs
        postData.pageIndex = Math.min(postData.pageIndex, postData.pageIndexs);
        postData.pageIndex = Math.max(postData.pageIndex, 1);

        const skip = (postData.pageIndex - 1) * postData.pageSize;
        const data = await User.find().sort({_id: -1}).limit(postData.pageSize).skip(skip);
        // 过滤密码
        // const datas = JSON.parse(JSON.stringify(data));
        // datas.forEach(item => {
        //     delete item.password;
        // })
        responseData.result = {};
        responseData.result.result = data;
        responseData.result.totalCount = postData.counts;
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '成功。';
        responseData.result.status = 'success';
        return responseData;
    }
}

module.exports = user;