import qs from "qs";
import request from "@/utils/request/request";

/**
 * 获取参数列表
 * @returns {Promise<*>}
 */
export function getRoleList(params) {
	return request.post({
		url: "/p/auth/auth-role/getRoleList",
		data: qs.stringify(params),
		customs: {
			isLoading: true,
			loadingText: "角色列表获取中..."
		}
	});
}

/**
 * 删除角色信息
 * @param params
 * @returns {Promise<*>}
 */
export function delRole(params) {
	return request.post({
		url: "/p/auth/auth-role/delRole",
		data: qs.stringify(params),
		customs: {
			isLoading: true,
			loadingText: "角色删除中...",
			successTip: "角色删除成功"
		}
	});
}

/**
 * 保存或新增角色信息
 * @param params
 * @returns {Promise<*>}
 */
export function saveOrUptRole(params) {
	return request.post({
		url: "/p/auth/auth-role/saveOrUptRole",
		data: qs.stringify(params),
		customs: {
			isLoading: true,
			loadingText: "角色提交中...",
			successTip: "角色提交成功"
		}
	});
}
