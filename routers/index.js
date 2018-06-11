// 路由api
let Router = require('koa-router');
let router = new Router()
const user =  require('./user');

router.post('/user/register', async (ctx) => {ctx.body = await user.register(ctx);});
router.post('/user/login', async (ctx) => {ctx.body = await user.login(ctx);});
router.post('/user/userInfo', async (ctx) => {ctx.body = await user.userInfo(ctx);});
router.post('/user/edit', async (ctx) => {ctx.body = await user.edit(ctx);});
router.post('/user/delete', async (ctx) => {ctx.body = await user.delete(ctx);});
router.post('/user/bulkDelete', async (ctx) => {ctx.body = await user.bulkDelete(ctx);});

module.exports = router;