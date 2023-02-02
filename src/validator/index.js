/**
 * 公共验证数据方法
 * @param data 要验证的数据
 * @param schema 验证数据的 schema
 * @param isShowTip 是否显示错误提示
 * @returns {Promise<unknown>}
 */
export default function validator({ data, schema, isShowTip = true }) {
	return new Promise((resolve, reject) => {
		const { error } = schema.validate(data, { allowUnknown: true });
		if (error) {
			if (isShowTip) window.$message.warning(error.message);
			reject(error);
		} else {
			resolve();
		}
	});
}
