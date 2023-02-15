const Koa = require("koa");

const app = new Koa();

const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa-cors");
const router = require("./routes/index");

// 注册error
onerror(app);
// 注册bodyparser
app.use(bodyparser());
// 注册日志
app.use(logger());
// // 注册静态资源
// app.use(require("koa-static")(__dirname + "/public"));
// 注册跨域
app.use(cors());
// 注册自定义中间件
require("./middlewares/index")(app);
// 注册路由
app.use(router.routes(), router.allowedMethods());

// logger-handling
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// error-handling
app.on("error", (err, ctx) => {
	console.error("server error", err, ctx);
});

module.exports = app;

// app.listen(process.argv[2], () => {
// 	console.log(`前端工程化辅助node服务启动成功，服务地址: http://127.0.0.1:${process.argv[2]}`);
// });
