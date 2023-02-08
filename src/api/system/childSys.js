import request from "@/utils/request/request";

/**
 * 获取系统列表
 * @returns {Promise<*>}
 */
export function getAuthSystemList(params) {
	return request.post({
		url: "/p/auth/auth-system/getAuthSystemList",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "系统列表获取中..."
		}
	});
}

/**
 * 保存或新增系统信息
 * @returns {Promise<*>}
 */
export function saveOrUptSystem(params) {
	return request.post({
		url: "/p/auth/auth-system/saveOrUptSystem",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "系统保存中..."
		}
	});
}

/**
 * 删除系统信息
 * @returns {Promise<*>}
 */
export function delSystem(params) {
	return request.post({
		url: "/p/auth/auth-system/delSystem",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "系统删除中..."
		}
	});
}

/**
 * 撤销删除系统信息
 * @returns {Promise<*>}
 */
export function cancelDelSystem(params) {
	return request.post({
		url: "/p/auth/auth-system/cancelDelSystem",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "系统删除撤销中..."
		}
	});
}
