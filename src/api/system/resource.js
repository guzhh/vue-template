import request from "@/utils/request/request";

/**
 * 获取资源列表
 * @returns {Promise<*>}
 */
export function getResourceList(params) {
	return request.post({
		url: "/p/auth/auth-resource/getResourceList",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "资源列表获取中..."
		}
	});
}

/**
 * 保存或新增资源信息
 * @param params
 * @returns {Promise<*>}
 */
export function saveOrUptResource(params) {
	return request.post({
		url: "/p/auth/auth-resource/saveOrUptResource",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "资源提交中...",
			successTip: "资源提交成功"
		}
	});
}

/**
 * 获取系统列表
 * @param params
 * @returns {Promise<*>}
 */
export function getSystemList(params) {
	return request.post({
		url: "/p/auth/auth-system/getSystemList",
		data: params
	});
}

/**
 * 删除资源信息
 * @param params
 * @returns {Promise<*>}
 */
export function delResource(params) {
	return request.post({
		url: "/p/auth/auth-resource/delResource",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "资源删除中...",
			successTip: "资源删除成功"
		}
	});
}
