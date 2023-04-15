import mitt from "mitt";

/**
 * 单独监听路由会浪费渲染性能。使用发布订阅模式去进行分发管理。
 */

const emitter = mitt();

const key = Symbol("ROUTE_CHANGE");

let latestRoute = null;

/**
 * 发布路由变化
 * @param to
 */
export function setRouteEmitter(to) {
	emitter.emit(key, to);
	latestRoute = to;
}

/**
 * 监听路由变化
 * @param handler
 * @param immediate
 */
export function listenerRouteChange(handler, immediate = true) {
	emitter.on(key, handler);
	if (immediate && latestRoute) {
		handler(latestRoute);
	}
}

/**
 * 删除路由变化监听
 */
export function removeRouteListener() {
	emitter.off(key);
}
