import request from "@/utils/request/request";

/**
 * 获取参数列表
 * @returns {Promise<*>}
 */
export function getRoleList(params) {
	return request.post({
		url: "/p/auth/auth-role/getRoleList",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "角色列表获取中..."
		}
	});
}

/**
 * 获取角色下的用户列表
 * @returns {Promise<*>}
 */
export function getUserByRole(params) {
	return request.post({
		url: "/p/auth/auth-role/getUserByRole",
		data: params,
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
		data: params,
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
		data: params,
		customs: {
			isLoading: true,
			loadingText: "角色提交中...",
			successTip: "角色提交成功"
		}
	});
}

/**
 * 角色权限分配
 * @param params
 * @returns {Promise<*>}
 */
export function roleResBind(params) {
	return request.post({
		url: "/p/auth/auth-role/roleResBind",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "角色资源提交中...",
			successTip: "角色资源提交成功"
		}
	});
}

/**
 * 获取角色绑定的所有资源
 * @param params
 * @returns {Promise<*>}
 */
export function getRoleAllRes(params) {
	return request.post({
		url: "/p/auth/auth-role/getRoleAllRes",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "角色绑定资源获取中..."
		}
	});
}

/**
 * 获取角色资源规则列表
 * @param params
 * @returns {Promise<*>}
 */
export function getRoleResRuleList(params) {
	return request.post({
		url: "/p/auth/auth-role-res-rule/getRoleResRuleList",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "角色资源规则获取中..."
		}
	});
}

/**
 * 新增或编辑角色资源规则
 * @param params
 * @returns {Promise<*>}
 */
export function saveOrUptRoleResRule(params) {
	return request.post({
		url: "/p/auth/auth-role-res-rule/saveOrUptRoleResRule",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "角色资源规则保存中..."
		}
	});
}

/**
 * 删除角色资源规则
 * @param params
 * @returns {Promise<*>}
 */
export function delRoleResRule(params) {
	return request.post({
		url: "/p/auth/auth-role-res-rule/delRoleResRule",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "角色资源规则删除中..."
		}
	});
}

/**
 * 修改用户角色资源状态
 * @param params
 * @returns {Promise<*>}
 */
export function uptRoleResRuleState(params) {
	return request.post({
		url: "/p/auth/auth-role-res-rule/uptRoleResRuleState",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "角色资源状态修改中..."
		}
	});
}
