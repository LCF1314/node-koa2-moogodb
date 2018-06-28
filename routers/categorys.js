/**
 * Created by Jason on 2018/4/28.
 */
/**
 * Created by Jason on 2018/4/28.
 */
const _ = require('lodash');
const router = require('koa-router');
const Categorys = require('../models/categorys')
// const Content = require('../models/Content')
const responseData = {}
const category =  {
    create: async (ctx) => {
        const categoryName = ctx.request.body.categoryName;
        const notes = ctx.request.body.notes;
        const counts = ctx.request.body.counts;
        const addTime = ctx.request.body.addTime;
        const user = ctx.request.body.userId.toString();
        // 分类名是否已经被存在了，如果存在和用户名相同的数据，提示用户名已存在
        if(await Categorys.findOne({categoryName: categoryName})){
            responseData.error = {};
            ctx.response.status = 500;
            responseData.error.code = 5;
            responseData.error.message = '该分类名称已被占用！请重新输入！';
            if(responseData.result) delete responseData.result;
            return responseData;
        }
        responseData.result = {};
        const categorysInfo = await new Categorys({
            categoryName: categoryName,
            notes: notes,
            user: user,
            addTime: addTime,
            counts: counts || 0
        }).save();
        responseData.result.data = {
            _id: categorysInfo._id,
            categoryName: categorysInfo.categoryName,
            notes: categorysInfo.notes,
            counts: categorysInfo.counts
        };
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '新增成功。';
        responseData.result.status = 'success';
        return responseData;
    },
    update: async (ctx) => {
        const category = await Categorys.update({_id: ctx.request.body._id},ctx.request.body);
        responseData.result = {};
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '修改成功。';
        responseData.result.status = 'success';
        return responseData;
    },
    delete: async (ctx) => {
        const category = await Categorys.remove({_id: ctx.request.body._id});
        responseData.result = {};
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '删除成功。';
        responseData.result.status = 'success';
        return responseData;
    },
    bulkDelete: async (ctx) => {
        const category = await Categorys.remove({_id: {$in: ctx.request.body.ids}});
        responseData.result = {};
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '批量删除成功。';
        responseData.result.status = 'success';
        return responseData;
    },
    infoList: async (ctx) => {
        const postData = {
            pageIndex: Number(ctx.request.body.pageIndex),
            pageSize: Number(ctx.request.body.pageSize),
            pageIndexs: 0,
            categorys: [],
            counts: 0,
        }
        postData.counts = await Categorys.count();
        postData.pageIndexs = Math.ceil(postData.counts / postData.pageSize);
        // 取值不能超过pageIndexs
        postData.pageIndex = Math.min(postData.pageIndex, postData.pageIndexs);
        postData.pageIndex = Math.max(postData.pageIndex, 1);
        const skip = (postData.pageIndex - 1) * postData.pageSize;
        responseData.result = {};
        const data = await Categorys.find().sort({_id: -1}).limit(postData.pageSize).skip(skip).populate('user');
         // 过滤密码
        const datas = JSON.parse(JSON.stringify(data));
        datas.forEach(item => {
            delete item.user.password;
            item.username = item.user.username;
        })
        responseData.result.result = datas;
        responseData.result.totalCount = postData.counts;
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '成功。';
        responseData.result.status = 'success';
        return responseData;
    }
   
}

module.exports = category;