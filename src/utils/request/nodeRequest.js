import Request from "./axios";
import Loading from "@/components/Loading/index";

export default new Request({
	baseURL: import.meta.env.VITE_DEV_NODE_API,
	timeout: 1000 * 60 * 2,
	headers: {
		"Content-Type": "application/json;charset=UTF-8"
	},
	// 实例级拦截器
	interceptors: {
		// 实例级请求拦截器
		requestInterceptor: config => {
			// 打开全局请求loading
			if (config.customs?.isLoading) {
				config.customs.loadingInstance = Loading.load(config.customs?.loadingText || "数据加载中...");
			}
			// 防止缓存，给get请求加上时间戳
			if (config.method === "get" || config.method === "GET") {
				config.params = { ...config.params, t: new Date().getTime() };
			}
			return config;
		},
		// 实例级响应拦截器
		responseInterceptor: response => {
			// 关闭打开全局请求loading
			if (response.config.customs?.isLoading) {
				response.config?.customs?.loadingInstance.close();
			}
			if (response.data?.success === false) {
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
