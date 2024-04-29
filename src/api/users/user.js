import request from "@/utils/request/request";

/**
 * 登录
 * @param data
 * @returns {Promise<*>}
 */
export function login(data) {
	return request.post({
		url: "/p/login",
		data,
		customs: {
			isLoading: true,
			loadingText: "系统登录中..."
		},
		interceptors: {
			responseInterceptor: res => {
				if (res.success) {
					return res;
				}
				return Promise.reject(new Error(res.message));
			}
		}
	});
}

/**
 * 系统退出
 * @returns {Promise<*>}
 */
export function logout() {
	return request.post({
		url: "/p/logout",
		customs: {
			isLoading: true
		}
	});
}

/**
 * 获取用户信息
 * @returns {Promise<*>}
 */
export function getUserInfo() {
	return request.post({
		url: "/p/user/info",
		customs: {
			isLoading: true,
			loadingText: "用户信息获取中..."
		},
		interceptors: {
			responseInterceptor: res => {
				if (res.success) {
					return res;
				}
				return Promise.reject(new Error(res.message));
			}
		}
	});
}

/**
 * 用户自行修改密码
 * @returns {Promise<*>}
 */
export function uptPasswd(data) {
	return request.post({
		url: "/p/user/uptPasswd",
		data,
		customs: {
			isLoading: true,
			loadingText: "用户密码修改中...",
			successTip: "密码修改成功"
		}
	});
}

/**
 * 根据账号信息获取科室集合
 * @returns {Promise<*>}
 */
export function getDeptByAccount(params) {
	return request.post({
		url: "/p/user/getDeptByAccount",
		data: params,
		customs: {
			isLoading: true
		}
	});
}

/**
 * 当前所在科室切换中
 * @param params
 * @returns {Promise<*>}
 */
export function changeDept(params) {
	return request.post({
		url: "/p/user/changeDept",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "当前所在科室切换中...",
			successTip: "当前所在科室切换成功"
		}
	});
}

/**
 * 获取用户信息及用户科室信息
 * @param params
 * @returns {Promise<*>}
 */
export function getUserAndDeptByUserType(params) {
	return request.post({
		url: "/p/user/getUserAndDeptByUserType",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "数据获取中..."
		}
	});
}

/**
 * 科室解绑用户
 * @param params
 * @returns {Promise<*>}
 */
export function unbindDeptUser(params) {
	return request.post({
		url: "/p/user/unbindDeptUser",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "数据解绑中...",
			successTip: "解绑成功"
		}
	});
}
