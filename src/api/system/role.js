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
