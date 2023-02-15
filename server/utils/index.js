const fs = require("fs");

// 下划线转换驼峰
function toHump(name) {
	return name.replace(/\_(\w)/g, function (all, letter) {
		return letter.toUpperCase();
	});
}
// 驼峰转换下划线
function toLine(name) {
	return name.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/**
 * 判断文件是否存在，不存在则创建
 * @param pathWay
 * @returns {Promise<unknown>}
 */
function isFileExisted(pathWay) {
	return new Promise(resolve => {
		fs.access(pathWay, err => {
			if (err) {
				fs.appendFileSync(pathWay, "", "utf-8");
				resolve(true);
			} else {
				resolve(true);
			}
		});
	});
}

module.exports = { toLine, toHump, isFileExisted };
