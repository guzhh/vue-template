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
export function uptPasswd() {
	return request.post({
		url: "/p/user/uptPasswd",
		customs: {
			isLoading: true,
			loadingText: "用户密码修改中...",
			successTip: "密码修改成功"
		}
	});
}
