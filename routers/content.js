/**
 * Created by Jason on 2018/4/28.
 */
/**
 * Created by Jason on 2018/4/28.
 */
// const _ = require('lodash');
const router = require('koa-router');
const Content = require('../models/Content')
const responseData = {}
const content =  {
    create: async (ctx) => {
        const content = ctx.request.body.content;
        const description = ctx.request.body.description;
        const title = ctx.request.body.title;
        const addTime = ctx.request.body.addTime;
        const user = ctx.request.body.userId.toString();
        const categoryId = ctx.request.body.categoryId.toString();
        const views = ctx.request.body.views;
        const comments = ctx.request.body.comments;
        const categoryName = ctx.request.body.categoryName;
        if(await Content.findOne({title: title})){
            responseData.error = {};
            ctx.response.status = 500;
            responseData.error.code = 5;
            responseData.error.message = '该标题已被占用！请重新输入！';
            if(responseData.result) delete responseData.result;
            return responseData;
        }else{
            delete responseData.error;
        }
        responseData.result = {};
        // 用户名是否已经被注册了，如果存在和用户名相同的数据，提示用户名已注册
        const contentsInfo = await new Content({
            content: content,
            description: description,
            title: title,
            addTime: addTime,
            categoryId: categoryId,
            views: views,
            comments: comments,
            user: user || 0,
            categoryName: categoryName,
        }).save();
        responseData.result.result = contentsInfo;
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '添加成功。';
        responseData.result.status = 'success';
        return responseData;
    },
    update: async (ctx) => {
        const content = await Content.update({_id: ctx.request.body._id},ctx.request.body);
        const data =  await Content.findOne({_id: ctx.request.body._id});
        responseData.result = {};
        responseData.result.data = data;
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '修改成功。';
        responseData.result.status = 'success';
        return responseData;
    },
    delete: async (ctx) => {
        const content = await Content.remove({_id: ctx.request.body._id});
        responseData.result = {};
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '删除成功。';
        responseData.result.status = 'success';
        return responseData;
    },
    bulkDelete: async (ctx) => {
        const content = await Content.remove({_id: {$in: ctx.request.body.ids}});
        responseData.result = {};
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '批量删除成功。';
        responseData.result.status = 'success';
        return responseData;
    },
    getModel: async (ctx) =>{
        const content = await Content.findOne({_id: ctx.request.body.id});
        responseData.result = {};
        responseData.result.result = content;
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '成功。';
        responseData.result.status = 'success';
        return responseData;
    },
    infoList: async (ctx) => {
        const postData = {
            pageIndex: Number(ctx.request.body.pageIndex),
            pageSize: Number(ctx.request.body.pageSize),
            pageIndexs: 0,
            contents: [],
            counts: 0,
        }
        postData.counts = await Content.count();
        postData.pageIndexs = Math.ceil(postData.counts / postData.pageSize);
        // 取值不能超过pageIndexs
        postData.pageIndex = Math.min(postData.pageIndex, postData.pageIndexs);
        postData.pageIndex = Math.max(postData.pageIndex, 1);
        const skip = (postData.pageIndex - 1) * postData.pageSize;
        responseData.result = {};
        const data = await Content.find().sort({_id: -1}).limit(postData.pageSize).skip(skip).populate(['categoryId','user']);
         // 过滤密码
        const datas = JSON.parse(JSON.stringify(data));
        datas.forEach(item => {
            delete item.user.password;
            item.username = item.user.username;
            // item.categoryName = item.category.categoryName;
            item.views = item.views || '0';
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

module.exports = content;