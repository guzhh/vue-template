const { optimize } = require("svgo");
const fs = require("fs");
const path = require("path");

function fileDisplay(filePath) {
	// 根据文件路径读取文件，返回文件列表
	fs.readdir(filePath, (err, files) => {
		if (err) {
			throw err;
		}
		// 遍历读取到的文件列表
		files.forEach(filename => {
			// 获取当前文件的绝对路径
			const fileDir = path.join(filePath, filename);
			// 根据文件路径获取文件信息，返回一个fs.Stats对象
			fs.stat(fileDir, (error, stats) => {
				if (error) {
					throw error;
				}

				const isFile = stats.isFile(); // 是文件
				const isDir = stats.isDirectory(); // 是文件夹

				if (isFile) {
					// 是文件
					// 读取文件内容
					if (fileDir.includes(".svg")) {
						// 是svg文件
						fs.readFile(fileDir, "utf8", (err2, data) => {
							if (err2) {
								throw err2;
							}
							// console.log(data)
							const result = optimize(data);
							// 写入原文件
							// eslint-disable-next-line max-nested-callbacks
							fs.writeFile(fileDir, result.data, err3 => {
								if (err3) {
									throw err3;
								}
							});
						});
					}
				} else if (isDir) {
					fileDisplay(fileDir); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
				}
			});
		});
	});
}

fileDisplay(path.resolve(__dirname, "../images"));
