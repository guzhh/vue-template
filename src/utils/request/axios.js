import axios from "axios";

export default class Request {
	constructor(config) {
		// 创建axios请求实例
		this.instance = axios.create(config);

		// 从实例配置config中获取拦截器配置
		this.interceptors = config.interceptors;

		// 全局请求拦截器
		this.instance.interceptors.request.use(
			requestConfig => {
				return requestConfig;
			},
			error => {
				console.log("请求发送失败：", error);
				return Promise.reject(error);
			}
		);

		// 全局响应拦截器
		this.instance.interceptors.response.use(
			response => {
				// response为AxiosResponse类型，含有config\data\headers\request\status\statusText属性
				// console.log(response)
				// 改造返回的数据类型，即将AxiosResponse的data返回
				return response;
			},
			error => {
				// console.log('全局响应失败拦截')
				// console.log('全局响应失败拦截：请求参数：', error.request)
				// console.log('全局响应失败拦截：失败响应参数：', error.response)
				return Promise.reject(error);
			}
		);

		// 实例级别 请求拦截器 拦截
		this.instance.interceptors.request.use(
			this.interceptors?.requestInterceptor, // 请求发送成功
			this.interceptors?.requestInterceptorCatch // 请求发送失败
		);

		// 实例级别 响应拦截器 拦截
		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptor, // 请求响应成功
			this.interceptors?.responseInterceptorCatch // 请求响应失败
		);
	}

	/**
	 * 请求发送方法
	 * @param config
	 * @returns {Promise<unknown>}
	 */
	request(config) {
		return new Promise((resolve, reject) => {
			// 方法级  请求拦截器位置
			if (config.interceptors?.requestInterceptor) {
				// eslint-disable-next-line no-param-reassign
				config = config.interceptors.requestInterceptor(config);
			}

			// 发起请求
			this.instance
				.request(config)
				.then(res => {
					// 方法级 响应拦截设置位置
					if (config.interceptors?.responseInterceptor) {
						// eslint-disable-next-line no-param-reassign
						res = config.interceptors.responseInterceptor(res);
					}
					resolve(res);
				})
				.catch(error => {
					reject(error);
				});
		});
	}

	/**
	 * get 请求
	 * @param config
	 * @returns {Promise<*>}
	 */
	get(config) {
		return this.request({ ...config, method: "GET" });
	}

	/**
	 * post 请求
	 * @param config
	 * @returns {Promise<*>}
	 */
	post(config) {
		return this.request({ ...config, method: "POST" });
	}
}
