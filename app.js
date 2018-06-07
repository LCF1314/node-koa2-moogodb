// 引入koa
const Koa = require('koa');
// 引入node fs模块
const fs = require('fs');
// 引入node path模块
const path = require('path');

// 引入koa 路由中间件
const Router = require('koa-router');
// 引入koa静态文件中间
const static = require('koa-static');  
// 引入moogoDB中间件/数据库地址设置 User表
var mongoose = require('mongoose');
const config = require('./config');
var User = require('./models/user');
// 进行跨域处理
const cors = require('koa2-cors');
// 获取post请求数据 --ctx.request.body
const koaBody = require('koa-body');
const index =  require('./routers/index');

// 执行koa
const app = new Koa() 
let router = new Router()

// 设置跨域信息
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
// 加载静态文件配置
const staticPath = './static' 
app.use(static(
  path.join( __dirname,  staticPath)
))
// 加载koa Body 中间件
app.use(koaBody());
const apiRouter = require('./routers/index');
// router.post('/', async (ctx) => {
//     ctx.body = await register(ctx);
// });
app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
// 监听http服务 与连接数据库
mongoose.connect(`${config.mongodbPath}:${config.port}`, function (err) {
    if(err){
        console.log('失败')
    }else{
        app.listen(3000);
        console.log('成功')
    }
});