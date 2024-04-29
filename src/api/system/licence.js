import request from "@/utils/request/request";

/**
 * 更新证书
 * @returns {Promise<*>}
 */
export function updateLicense(params) {
	return request.post({
		url: "/p/license/updateLicense",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "更新证书操作中...",
			successTip: "更新证书操作成功~"
		}
	});
}

/**
 * 获取证书信息
 * @returns {Promise<*>}
 */
export function info(params) {
	return request.get({
		url: "/p/license/info",
		params,
		customs: {
			isLoading: false
		}
	});
}
