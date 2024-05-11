// 消息处理器
export default class MessageHandler {
	constructor() {
		this.callback = null;
		this.timer = null;
		this.resolve = null;
		this.reject = null;
		this.data = null;
	}

	// 处理消息
	handle(data, fused) {
		// 消息处理结果
		const result = {
			sendData: this.data,
			receiveData: data,
			handleData: null
		};

		// 熔断器
		// eslint-disable-next-line no-underscore-dangle
		const _fused = () => {
			// 收到熔断信号，清除定时器
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			// 执行上层的熔断函数
			fused();

			// 执行 resolve
			if (this.resolve) {
				// 这里需要等待回调函数执行完毕，才能执行 resolve，这样才能拿到 handleData
				Promise.resolve().then(() => {
					this.resolve(result);
					this.resolve = null;
				});
			}
		};

		// 执行回调函数
		if (typeof this.callback === "function") {
			try {
				result.handleData = this.callback(data, _fused);
			} catch (e) {
				this.reject(e);
				throw e;
			}
		}
	}
}
