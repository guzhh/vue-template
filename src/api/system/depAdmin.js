import qs from "qs";
import request from "@/utils/request/request";

/**
 * 获取科室列表
 * @returns {Promise<*>}
 */
export function getDeptList(params) {
	return request.post({
		url: "/p/auth/auth-depart/getDeptList",
		data: qs.stringify(params),
		customs: {
			isLoading: true,
			loadingText: "科室列表获取中..."
		}
	});
}

/**
 * 保存或新增科室信息
 * @returns {Promise<*>}
 */
export function saveOrUptDept(params) {
	return request.post({
		url: "/p/auth/auth-depart/saveOrUptDept",
		data: qs.stringify(params),
		customs: {
			isLoading: true,
			loadingText: "保存数据中..."
		}
	});
}

/**
 * 删除科室信息
 * @returns {Promise<*>}
 */
export function delDept(params) {
	return request.post({
		url: "/p/auth/auth-depart/delDept",
		data: qs.stringify(params),
		customs: {
			isLoading: true,
			loadingText: "删除科室中..."
		}
	});
}

/**
 * 撤销删除科室信息
 * @returns {Promise<*>}
 */
export function cancelDelDept(params) {
	return request.post({
		url: "/p/auth/auth-depart/cancelDelDept",
		data: qs.stringify(params),
		customs: {
			isLoading: true,
			loadingText: "撤销删除中..."
		}
	});
}
