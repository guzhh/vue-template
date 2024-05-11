import request from "@/utils/request/request";

/**
 * 获取用户列表
 * @returns {Promise<*>}
 */
export function getUserList(params) {
	return request.post({
		url: "/p/user/list",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "用户列表获取中..."
		}
	});
}
/**
 * 获取用户列表
 * @returns {Promise<*>}
 */
export function getUserListNew(params) {
	return request.post({
		url: "/p/user/newList",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "用户列表获取中..."
		}
	});
}

/**
 * 保存或修改用户
 * @returns {Promise<*>}
 */
export function saveOrUpt(params) {
	return request.post({
		url: "/p/user/saveOrUpt",
		data: params,
		headers: {
			"Content-Type": "application/json;charset=UTF-8"
		},
		customs: {
			isLoading: true,
			loadingText: "用户信息保存中..."
		}
	});
}

/**
 * 修改密码
 * @returns {Promise<*>}
 */
export function uptPasswd(params) {
	return request.post({
		url: "/p/user/uptPasswd",
		data: params,
		customs: {
			isLoading: true
		}
	});
}

/**
 * 重置密码
 * @returns {Promise<*>}
 */
export function restPasswd(params) {
	return request.post({
		url: "/p/user/restPasswd",
		data: params,
		customs: {
			isLoading: true
		}
	});
}

/**
 * 踢人下线
 * @returns {Promise<*>}
 */
export function kickout(params) {
	return request.post({
		url: "/p/user/kickout",
		data: params,
		customs: {
			isLoading: true
		}
	});
}

/**
 * 禁用或删除用户
 * @returns {Promise<*>}
 */
export function disableOrDelUser(params) {
	return request.post({
		url: "/p/user/disableOrDelUser",
		data: params,
		customs: {
			isLoading: true
		}
	});
}

/**
 * 恢复用户状态（禁用-删除）
 * @returns {Promise<*>}
 */
export function recoveryUser(params) {
	return request.post({
		url: "/p/user/recoveryUser",
		data: params,
		customs: {
			isLoading: true
		}
	});
}

/**
 * 解锁
 * @returns {Promise<*>}
 */
export function unlock(params) {
	return request.post({
		url: "/p/user/unlock",
		data: params,
		customs: {
			isLoading: true
		}
	});
}

/**
 * 上传用户excel文件
 * @returns {Promise<*>}
 */
export function uploadUser(param) {
	return request.post({
		url: "/p/user/upload",
		data: param,
		headers: {
			"Content-Type": "multipart/form-data"
		},
		customs: {
			isLoading: true
		}
	});
}

/**
 * 用户信息模板下载
 * @returns {AxiosPromise}
 * @constructor
 */
export function downLoadTemplate(params) {
	return request.get({
		url: "/p/user/downLoadTemplate",
		responseType: "blob",
		params,
		timeout: 1000 * 60 * 10,
		// 自定义配置
		customs: {
			isLoading: true,
			loadingText: "模板下载中..."
		}
	});
}

/**
 * 设置用户角色
 * @returns {Promise<*>}
 */
export function setUserRole(params) {
	return request.post({
		url: "/p/user/setUserRole",
		data: params,
		customs: {
			isLoading: true
		}
	});
}

/**
 * 获取全部角色列表
 * @returns {Promise<*>}
 */
export function getRoleAllList(params) {
	return request.post({
		url: "/p/auth/auth-role/getRoleAllList",
		data: params,
		customs: {
			isLoading: true
		}
	});
}

/**
 * 获取用户下绑定的角色列表
 * @returns {Promise<*>}
 */
export function getUserRoleAll(params) {
	return request.post({
		url: "/p/auth/auth-role/getUserRoleAll",
		data: params,
		customs: {
			isLoading: true
		}
	});
}

/**
 * 获取用户列表
 * @returns {Promise<*>}
 */
export function getAllUserList(params) {
	return request.post({
		url: "/p/user/getAllUserList",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "用户列表获取中..."
		}
	});
}

/**
 * 根据用户类型获取用户信息
 * @param params
 * @returns {Promise<*>}
 */
export function getUserInfoByUserType(params) {
	return request.post({
		url: "/p/user/getUserInfoByUserType",
		data: params,
		customs: {
			isLoading: true
		}
	});
}

/**
 * 批量新增用户信息
 * @returns {Promise<*>}
 */
export function bacthSaveOrUptUser(params) {
	return request.post({
		url: "/p/user/bacthSaveOrUptUser",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "数据获取中..."
		},
		headers: {
			"Content-Type": "application/json;charset=UTF-8"
		}
	});
}
