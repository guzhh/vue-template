import qs from "qs";
import request from "@/utils/request/request";

/**
 * 获取资源列表
 * @returns {Promise<*>}
 */
export function getResourceList(params) {
	return request.post({
		url: "/p/auth/auth-resource/getResourceList",
		data: qs.stringify(params),
		customs: {
			isLoading: true,
			loadingText: "资源列表获取中..."
		}
	});
}
