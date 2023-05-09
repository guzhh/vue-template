/**
 * 为对象添加事件监听
 * @param target 可以是一个文档上的元素 Element、Document 和 Window，也可以是任何支持事件的对象（比如 XMLHttpRequest）
 * @param event 事件名称
 * @param handler 处理方法
 * @param capture 如果是`true`，表示`listener`会在该类型的事件捕获阶段传播到该`EventTarget`时触发 （即表示是否支持监听通过冒泡传递过来的触发）
 */
export function addEventListen(target, event, handler, capture = false) {
	if (target.addEventListener && typeof target.addEventListener === "function") {
		target.addEventListener(event, handler, capture);
	}
}

/**
 * 删除对象事件监听
 * @param target 可以是一个文档上的元素 Element、Document 和 Window，也可以是任何支持事件的对象（比如 XMLHttpRequest）
 * @param event 事件名称
 * @param handler 处理方法
 * @param capture 如果是`true`，表示`listener`会在该类型的事件捕获阶段传播到该`EventTarget`时触发 （即表示是否支持监听通过冒泡传递过来的触发）
 */
export function removeEventListen(target, event, handler, capture = false) {
	if (target.removeEventListener && typeof target.removeEventListener === "function") {
		target.removeEventListener(event, handler, capture);
	}
}
