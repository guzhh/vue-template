import { defineStore } from "pinia";
import { login as userLogin, logout as userLogout, getUserInfo } from "@/api/users/user";
import { clearToken, setToken } from "@/utils/auth";
import { formatTheResource } from "@/router/constants";

const useUserStore = defineStore("user", {
	state: () => ({
		id: null,
		orgCode: null,
		departCode: null,
		account: null,
		name: null,
		errCount: null,
		state: null,
		phone: null,
		email: null,
		createType: null,
		createTime: null,
		ifOnline: null, // 是否在线
		roleList: [], // 角色列表
		resourceList: [], // 资源列表
		permissionList: [] // 权限标识
	}),

	getters: {
		userInfo(state) {
			return { ...state };
		}
	},
	actions: {
		// 设置用户信息
		setInfo(partial) {
			this.$patch(partial);
		},
		// 重置用户信息
		resetInfo() {
			this.$reset();
		},
		// 登录
		async login(loginForm) {
			try {
				const res = await userLogin(loginForm);
				setToken(res.result.tokenValue);
				return Promise.resolve();
			} catch (err) {
				clearToken();
				throw err;
			}
		},
		logoutCallBack() {
			this.resetInfo();
			clearToken();
		},
		// 退出登录
		async logout() {
			try {
				await userLogout();
			} finally {
				this.logoutCallBack();
			}
			return Promise.resolve();
		},
		// 获取用户信息
		async info() {
			const res = await getUserInfo();
			const permissionList = res.result.resourceList.map(item => item.permissionFlag);
			res.result.resourceList = formatTheResource(res.result.resourceList); // 处理资源为符合前端要求的资源
			this.setInfo({ ...res.result, permissionList });
		}
	}
});

export default useUserStore;
