// 路由api
let Router = require('koa-router');
let router = new Router()
const user =  require('./user'); // 用户接口
const categorys =  require('./categorys'); // 分类接口
const content =  require('./content'); // 分类接口
// 用户注册/登录
router.post('/user/register', async (ctx) => {ctx.body = await user.register(ctx);});
router.post('/user/login', async (ctx) => {ctx.body = await user.login(ctx);});
// 用户编辑/删除
router.post('/user/userInfo', async (ctx) => {ctx.body = await user.userInfo(ctx);});
router.post('/user/update', async (ctx) => {ctx.body = await user.update(ctx);});
router.post('/user/delete', async (ctx) => {ctx.body = await user.delete(ctx);});
router.post('/user/bulkDelete', async (ctx) => {ctx.body = await user.bulkDelete(ctx);});
// 分类增删改
router.post('/categorys/create', async (ctx) => {ctx.body = await categorys.create(ctx);});
router.post('/categorys/update', async (ctx) => {ctx.body = await categorys.update(ctx);});
router.post('/categorys/delete', async (ctx) => {ctx.body = await categorys.delete(ctx);});
router.post('/categorys/bulkDelete', async (ctx) => {ctx.body = await categorys.bulkDelete(ctx);});
router.post('/categorys/infoList', async (ctx) => {ctx.body = await categorys.infoList(ctx);});
// 内容增删改
router.post('/content/create', async (ctx) => {ctx.body = await content.create(ctx);});
router.post('/content/infoList', async (ctx) => {ctx.body = await content.infoList(ctx);});
router.post('/content/update', async (ctx) => {ctx.body = await content.update(ctx);});
router.post('/content/delete', async (ctx) => {ctx.body = await content.delete(ctx);});
router.post('/content/bulkDelete', async (ctx) => {ctx.body = await content.bulkDelete(ctx);});
router.post('/content/getModel', async (ctx) => {ctx.body = await content.getModel(ctx);});
module.exports = router;