import storage from "store";
import { layer } from "@layui/layer-vue";
import router from "@/router";
import Request from "./axios";

const ACCESS_TOKEN = import.meta.env.VITE_BASE_API_URL;

export default new Request({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 1000 * 60 * 2,
	headers: {
		"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
	},
	// 实例级拦截器
	interceptors: {
		// 实例级请求拦截器
		requestInterceptor: config => {
			// 打开全局请求loading
			if (config.customs?.isLoading) {
				config.customs.loadingInstance = layer.load(0);
			}
			// 防止缓存，给get请求加上时间戳
			if (config.method === "get" || config.method === "GET") {
				config.params = { ...config.params, t: new Date().getTime() };
			}
			const token = storage.get(ACCESS_TOKEN);
			if (token) {
				config.headers[ACCESS_TOKEN] = token;
			}
			return config;
		},
		// 实例级响应拦截器
		responseInterceptor: response => {
			// 关闭打开全局请求loading
			if (response.config.customs?.isLoading) {
				layer.close(response.config?.customs?.loadingInstance);
			}
			if (response.status === 203) {
				window.$notification.error({ content: "登录过期", meta: response.data.message, keepAliveOnHover: true });
				router.push({ name: "Login" });
				storage.clearAll();
			} else if (response.data?.status === "403") {
				window.$notification.error({ content: "无权访问", meta: `地址：${response.config.url}`, keepAliveOnHover: true });
			} else if (response.data?.success === false) {
				window.$notification.error({
					content: import.meta.env.MODE === "development" ? `接口返回失败：${response.config.url}` : "操作失败",
					meta: response.data.message,
					keepAliveOnHover: true
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
				layer.close(error.config?.customs?.loadingInstance);
			}
			window.$notification.error({ content: `网络请求错误：${error.config.url}`, meta: error.message, keepAliveOnHover: true });
			return Promise.reject(error);
		}
	}
});
