/**
 * 注册全局方法 待完善
 * @param app
 */
export function setupGlobalMethods(app) {
	/**
	 * 挂载一些系统公共参数
	 * @type {{pageSize: number}}
	 */
	app.config.globalProperties.$config = {
		pageSize: 20
	};
}
