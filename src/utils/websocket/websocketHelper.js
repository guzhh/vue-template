import ReconnectingWebSocket from "reconnecting-websocket";
import MessageHandler from "./messageHandler";

export default class WebsocketHelper {
	constructor(webHttp) {
		// 是否已经连接
		this.isConnected = false;
		// 连接成功次数
		this.openNum = 1;
		// 用于存储消息处理器
		this.messageHandlers = [];
		// 全局消息处理器
		this.ahiMessageHandlers = [];

		this.websocket = new ReconnectingWebSocket(webHttp, []);
		this.websocket.binaryType = "arraybuffer";

		// 监听 websocket 连接成功
		this.websocket.onopen = () => {
			this.openNum++;
			this.isConnected = true;
			this.onopen(this.openNum);
		};

		// websocket 连接失败
		this.websocket.onclose = () => {
			this.isConnected = false;
			// console.warn(`----------- 连接失败 ----------`);
		};

		// 监听连接关闭
		this.websocket.onclose = () => {
			this.isConnected = false;
			// console.warn(`----------- 连接关闭 ----------`);
		};

		// 收到消息
		this.websocket.onmessage = evt => {
			// console.log(`----------- 收到消息 ----------`, evt.data);
			// 熔断器
			let fusing = false;

			const fused = () => {
				fusing = true;
			};

			// 执行消息处理
			for (let i = 0; i < this.messageHandlers.length; i++) {
				const handler = this.messageHandlers[i];

				try {
					// 执行消息处理器
					handler.handle(evt.data, fused);
				} catch (e) {
					// 消息处理器执行失败
					handler.reject(e);
					this.messageHandlers.splice(i, 1);
					i--;
				}
				// 熔断
				if (fusing) {
					this.messageHandlers.splice(i, 1);
					return;
				}
			}
			for (let i = 0; i < this.ahiMessageHandlers.length; i++) {
				const handler = this.ahiMessageHandlers[i];
				try {
					// 执行消息处理器
					handler(evt.data);
				} catch {
					console.log("消息处理程序有问题");
				}
			}
			// this.onmessage(evt.data);
		};
	}

	// 当需要处理一些不需要进行触发也能收到的消息时对这个方法进行覆盖
	// eslint-disable-next-line class-methods-use-this
	onmessage() {}

	/**
	 * 注册消息监听
	 */
	registerMessageListener(callback) {
		this.ahiMessageHandlers.push(callback);
	}

	/**
	 * 取消消息处理监听
	 * @param callback
	 */
	cancelMessageListener(callback) {
		// 有一个数组 ['aa', 'bb', 'cc'], 删除aa
		const index = this.ahiMessageHandlers.indexOf(callback);
		if (index > -1) {
			this.messageHandlers.splice(index, 1);
		}
	}

	// 连接成功回调的函数
	// eslint-disable-next-line class-methods-use-this,no-unused-vars
	onopen(num) {}

	/**
	 * 发送消息
	 * @param data 消息内容
	 * @param handler 消息处理器
	 * @param waitTime 超时时间
	 * @returns {undefined|Promise<unknown>}
	 */
	send(data, handler, waitTime = 3000) {
		if (handler) {
			// this.websocket.send(msg);
			return new Promise((resolve, reject) => {
				if (!this.isConnected) {
					reject(new Error("websocket is not connected"));
				} else {
					// 创建消息处理器
					const messageHandler = new MessageHandler();
					messageHandler.callback = handler;
					messageHandler.resolve = resolve;
					messageHandler.reject = reject;
					messageHandler.data = data;

					// 设置超时，当上层调用未传递
					messageHandler.timer = setTimeout(
						() => {
							messageHandler.reject(new Error("timeout"));
							this.messageHandlers.splice(this.messageHandlers.indexOf(messageHandler), 1);
						},
						typeof waitTime === "number" ? waitTime : 3000
					);
					// 添加到消息处理器列表
					this.messageHandlers.push(messageHandler);
					// 发送消息
					this.websocket.send(data);
				}
			});
		}
		// 发送消息
		this.websocket.send(data);
		return undefined;
	}

	/**
	 * 关闭连接
	 */
	close() {
		if (this.websocket) {
			this.websocket.close();
		}
	}
}
