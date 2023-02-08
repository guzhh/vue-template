import request from "@/utils/request/request";

/**
 * 获取机构列表
 * @returns {Promise<*>}
 */
export function getOrgList(params) {
	return request.post({
		url: "/p/auth/auth-org/getOrgList",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "机构列表获取中..."
		}
	});
}

/**
 * 保存或新增机构信息
 * @returns {Promise<*>}
 */
export function saveOrUptOrg(params) {
	return request.post({
		url: "/p/auth/auth-org/saveOrUptOrg",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "保存机构信息中..."
		}
	});
}

/**
 * 删除机构信息
 * @returns {Promise<*>}
 */
export function delOrg(params) {
	return request.post({
		url: "/p/auth/auth-org/delOrg",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "删除机构信息中..."
		}
	});
}

/**
 * 撤销删除机构信息
 * @returns {Promise<*>}
 */
export function cancelDelOrg(params) {
	return request.post({
		url: "/p/auth/auth-org/cancelDelOrg",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "撤销中..."
		}
	});
}

/**
 * 根据机构编码获取当前机构信息
 * @param params
 * @returns {Promise<*>}
 */
export function getOrgInfoByCode(params) {
	return request.post({
		url: "/p/auth/auth-org/getOrgInfoByCode",
		data: params,
		customs: {
			isLoading: false
		}
	});
}
