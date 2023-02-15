const router = require("koa-router")();
const path = require("path");
const context = require("../utils/autoLoadFile");

router.prefix("/node-api");

/**
 * @param {Array} arr 需要注册路由的文件列表
 */
function importAll(arr) {
	arr.forEach(key => {
		router.use("", key.data.routes(), key.data.allowedMethods());
	});
}
importAll(context(path.join(__dirname, "./route"), false));

module.exports = router;
