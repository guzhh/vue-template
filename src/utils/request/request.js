import qs from "qs";
import router from "@/router";
import Request from "./axios";
import { clearToken, getToken } from "@/utils/auth";
import useUserStore from "@/store/modules/user";
import Loading from "@/components/Loading/index";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN_KEY;

export default new Request({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 1000 * 60 * 2,
	headers: {
		"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
		"device-flag": "PC"
	},
	// 实例级拦截器
	interceptors: {
		// 实例级请求拦截器
		requestInterceptor: config => {
			const userStore = useUserStore();
			// 打开全局请求loading
			if (config.customs?.isLoading) {
				config.customs.loadingInstance = Loading.load(config.customs?.loadingText || "数据加载中...");
			}
			// 防止缓存，给get请求加上时间戳
			if (config.method === "get" || config.method === "GET") {
				config.params = { orgCode: userStore.currentOrgCode, ...config.params, t: new Date().getTime() };
			} else if (config.method === "post" || config.method === "POST") {
				config.data = { orgCode: userStore.currentOrgCode, ...config.data };
				if (config.headers["Content-Type"] === "application/x-www-form-urlencoded;charset=UTF-8") {
					config.data = qs.stringify(config.data);
				}
			}
			const token = getToken(); // storage.get(ACCESS_TOKEN);
			if (token) {
				config.headers[ACCESS_TOKEN] = token;
			}
			return config;
		},
		// 实例级响应拦截器
		responseInterceptor: response => {
			// 关闭打开全局请求loading
			if (response.config.customs?.isLoading) {
				// layer.close(response.config?.customs?.loadingInstance);
				response.config?.customs?.loadingInstance.close();
			}
			if (response.data?.status === "60001") {
				window.$notification.error({
					content: "您尚未登录",
					meta: response.data.message,
					keepAliveOnHover: true,
					duration: 3000
				});
				router.push({ name: "login" });
				clearToken();
			} else if (response.data?.status === "60002") {
				window.$notification.error({
					content: "登录失效",
					meta: response.data.message,
					keepAliveOnHover: true,
					duration: 3000
				});
				router.push({ name: "login" });
				clearToken();
			} else if (response.data?.status === "403") {
				window.$notification.error({
					content: "无权访问",
					meta: `地址：${response.config.url}`,
					keepAliveOnHover: true,
					duration: 3000
				});
			} else if (response.data?.success === false) {
				window.$notification.error({
					content: import.meta.env.MODE === "development" ? `接口返回失败：${response.config.url}` : "操作失败",
					meta: response.data.message,
					keepAliveOnHover: true,
					duration: 3000
				});
			}
			// 接口请求成功提示
			if (response.data?.success && response.config?.customs?.successTip) {
				window.$message.success(response.config.customs.successTip);
			}
			return response.data;
		},
		// 请求响应失败拦截器
		responseInterceptorCatch: error => {
			if (error.config.customs?.isLoading) {
				error.config?.customs?.loadingInstance.close();
			}
			window.$notification.error({
				content: `网络请求错误：${error.config.url}`,
				meta: error.message,
				keepAliveOnHover: true,
				duration: 3000
			});
			return Promise.reject(error);
		}
	}
});
