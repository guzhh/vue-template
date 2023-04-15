import mitt from "mitt";

/**
 * 单独监听默认机构变化。使用发布订阅模式去进行分发管理。
 */

const emitter = mitt();

const key = Symbol("ORG_CHANGE");

let latestOrg = null;

/**
 * 发布默认机构变化
 * @param to
 */
export function setOrgEmitter(to) {
	emitter.emit(key, to);
	latestOrg = to;
}

/**
 * 监听默认机构变化
 * @param handler
 * @param immediate
 */
export function listenerOrgChange(handler, immediate = true) {
	emitter.on(key, handler);
	if (immediate && latestOrg) {
		handler(latestOrg);
	}
}

/**
 * 删除默认机构变化监听
 */
export function removeOrgListener() {
	emitter.off(key);
}
