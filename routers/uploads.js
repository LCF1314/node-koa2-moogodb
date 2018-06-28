const router = require('koa-router');
const Photos = require('../models/photos')
var fs = require('fs');//引用文件系统模块

const responseData = {};

const uploads = {
    uploadFile: async (ctx) => {
        if(await Photos.findOne({originalname: ctx.req.file.originalname})){
            fs.unlink('C:/www.lw1314.cn/uploadFile/'+ ctx.req.file.filename);
            responseData.error = {};
            responseData.result = {};
            ctx.response.status = 500;
            responseData.error.code = 5;
            responseData.error.message = '该图片已存在！请重新选择！';
            return responseData;
        }
        const photos = await new Photos({
            filePath: '/UploadFile/' + ctx.req.file.filename,
            fileName: ctx.req.file.filename,
            originalname: ctx.req.file.originalname,
            link: ctx.req.headers.origin+'/UploadFile/' + ctx.req.file.filename
        }).save();
        responseData.result = {};
        ctx.response.status = 200;
        responseData.result.result = photos;
        responseData.result.code = 1;
        responseData.result.message = '上传成功';
        responseData.result.status = 'success';
        return responseData;
    },
    getPhotos: async (ctx) => {
        const photos = await  Photos.find().sort({_id: -1});
        responseData.result = {};
        ctx.response.status = 200;
        responseData.result.result = photos;
        responseData.result.code = 1;
        responseData.result.message = '成功';
        responseData.result.status = 'success';
        return responseData;
    },
    deletePhoto: async (ctx) => {
        const photo = await Photos.remove({_id: ctx.request.body.id});
        if(photo){
            fs.unlink('C:/www.lw1314.cn/uploadFile/'+ ctx.request.body.fileName);
        }
        responseData.result = {};
        ctx.response.status = 200;
        responseData.result.code = 1;
        responseData.result.message = '删除成功。';
        responseData.result.status = 'success';
        return responseData;
    },
}
module.exports = uploads;