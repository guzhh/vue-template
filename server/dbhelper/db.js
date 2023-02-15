const mysql = require("mysql2");

module.exports = {
	query: (dbConfig, sql, params) => {
		return new Promise((resolve, reject) => {
			// 每次使用的时候需要创建链接，数据操作完成之后要关闭连接
			const connection = mysql.createConnection(dbConfig);
			connection.connect(err => {
				if (err) {
					reject(err);
				} else {
					// 开始数据操作
					connection.query(sql, params, (error, results, fields) => {
						// 停止链接数据库，必须在查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
						connection.end();
						if (error) {
							reject(error);
						} else {
							resolve(results, fields);
						}
					});
				}
			});
		});
	}
};
