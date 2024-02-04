import request from "@/utils/request/request";

/**
 * 获取参数列表
 * @returns {Promise<*>}
 */
export function getParamList(params) {
	return request.post({
		url: "/p/auth/auth-param/getParamList",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "参数列表获取中..."
		}
	});
}

/**
 * 清除参数缓存
 * @returns {Promise<*>}
 */
export function clsParamCache(params) {
	return request.post({
		url: "/p/auth/auth-param/clsParamCache",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "操作执行中...",
			successTip: "缓存清楚成功"
		}
	});
}

/**
 * 保存或新增参数信息
 * @returns {Promise<*>}
 */
export function saveOrUptParam(params) {
	return request.post({
		url: "/p/auth/auth-param/saveOrUptParam",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "参数保存中..."
		}
	});
}

/**
 * 删除参数信息
 * @returns {Promise<*>}
 */
export function delParam(params) {
	return request.post({
		url: "/p/auth/auth-param/delParam",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "参数删除中..."
		}
	});
}

/**
 * 根据参数 code 获取参数对象
 * @param params
 * @returns {Promise<*>}
 */
export function getParam(params) {
	return request.post({
		url: "/p/auth/auth-param/getParamByCode",
		data: params
	});
}

/**
 * 获取全部参数信息
 * @returns {Promise<*>}
 */
export function getAllParam(params) {
	return request.post({
		url: "/p/auth/auth-param/getAllParam",
		data: params
	});
}
