const path = require("path");
const context = require("../utils/autoLoadFile");

/**
 * @param {Array} arr 需要注册中间件的文件列表
 */
const install = app => {
	context(path.join(__dirname, "./middleware"), false).forEach(key => {
		app.use(key.data);
	});
};

module.exports = install;
