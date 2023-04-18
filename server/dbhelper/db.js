const mysql = require("mysql2");
const oracledb = require("oracledb");

module.exports = {
	query_mysql: (dbConfig, sql, params) => {
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
	},

	query_oracle: (dbConfig, sql) => {
		// eslint-disable-next-line no-async-promise-executor
		return new Promise(async (resolve, reject) => {
			try {
				oracledb.initOracleClient({ libDir: "E:\\Oracle\\instantclient_11_2" });
				const connection = await oracledb.getConnection(dbConfig);
				const result = await connection.execute(sql);
				const list = result.rows.map(item => {
					const obj = {};
					item.forEach((val, index) => {
						obj[result.metaData[index].name.toLowerCase()] = val.toLowerCase();
					});
					return obj;
				});
				connection.close();
				resolve(list);
			} catch (error) {
				reject(error);
			}
		});
	}
};
