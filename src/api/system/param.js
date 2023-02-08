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
