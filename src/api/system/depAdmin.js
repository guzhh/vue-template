import request from "@/utils/request/request";

/**
 * 获取科室列表
 * @returns {Promise<*>}
 */
export function getDeptList(params) {
	return request.post({
		url: "/p/auth/auth-depart/getDeptList",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "科室列表获取中..."
		}
	});
}

/**
 * 获取机构下所有科室信息
 * @returns {Promise<*>}
 */
export function getDeptByOrgCode(params) {
	return request.post({
		url: "/p/auth/auth-depart/getDeptByOrgCode",
		data: params,
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
		data: params,
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
		data: params,
		customs: {
			isLoading: true,
			loadingText: "删除科室中...",
			successTip: "科室删除成功"
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
		data: params,
		customs: {
			isLoading: true,
			loadingText: "撤销删除中...",
			successTip: "科室删除撤销成功"
		}
	});
}

/**
 * 获取用户所属的科室
 * @returns {Promise<*>}
 */
export function getDepartsByUser(params) {
	return request.post({
		url: "/p/auth/auth-depart/getDepartsByUser",
		data: params,
		customs: {
			isLoading: true
		}
	});
}

/**
 * 根据科室类型获取科室信息
 * @param params
 * @returns {Promise<*>}
 */
export function getDepartByDeptType(params) {
	return request.post({
		url: "/p/auth/auth-depart/getDepartByDeptType",
		data: params,
		customs: {
			isLoading: true
		}
	});
}
