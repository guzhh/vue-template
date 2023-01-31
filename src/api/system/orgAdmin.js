import qs from "qs";
import request from "@/utils/request/request";

/**
 * 获取机构列表
 * @returns {Promise<*>}
 */
export function getOrgList(params) {
	return request.post({
		url: "/p/auth/auth-org/getOrgList",
		data: qs.stringify(params),
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
		data: qs.stringify(params),
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
		data: qs.stringify(params),
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
		data: qs.stringify(params),
		customs: {
			isLoading: true,
			loadingText: "撤销中..."
		}
	});
}
