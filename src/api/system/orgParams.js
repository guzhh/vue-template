import request from "@/utils/request/request";

/**
 * 保存或新增
 * @returns {Promise<*>}
 */
export function saveOrUptOrgParam(params) {
	return request.post({
		url: "/p/auth/org-param/saveOrUpt",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "数据保存中...",
			successTip: "保存成功"
		}
	});
}
/**
 * 获取机构参数列表
 * @returns {Promise<*>}
 */
export function getOrgParamList(params) {
	return request.post({
		url: "/p/auth/org-param/getOrgParamList",
		data: params,
		customs: {
			isLoading: false,
			loadingText: "数据获取中..."
		}
	});
}
/**
 * 删除机构参数信息
 * @returns {Promise<*>}
 */
export function delOrgParam(params) {
	return request.post({
		url: "/p/auth/org-param/delOrgParam",
		data: params,
		customs: {
			isLoading: false,
			loadingText: "数据删除中...",
			successTip: "删除成功"
		}
	});
}
