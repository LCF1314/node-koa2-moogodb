const router = require('koa-router');
const Upload = require('../models/uploads')

const responseData = {};
const uploads = {
    upload: async (ctx) => {
        const uploadFile = await new Upload({
            filePath: '/UploadFile/' + ctx.req.file.filename,
            fileName: ctx.req.file.originalname,
            link: ctx.req.headers.origin+'/UploadFile/' + ctx.req.file.filename
        }).save();
        responseData.result = {};
        ctx.response.status = 200;
        responseData.result.data = uploadFile;
        responseData.result.code = 1;
        responseData.result.message = '上传成功';
        responseData.result.status = 'success';
        return responseData;
    },
}
module.exports = uploads;