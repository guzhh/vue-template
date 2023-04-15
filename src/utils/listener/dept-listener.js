import mitt from "mitt";

/**
 * 单独监听当前所在科室。使用发布订阅模式去进行分发管理。
 */

const emitter = mitt();

const key = Symbol("DEPT_CHANGE");

let latestDept = null;

/**
 * 发布默认当前所在科室变化
 * @param to
 */
export function setDeptEmitter(to) {
	emitter.emit(key, to);
	latestDept = to;
}

/**
 * 监听当前所在科室变化
 * @param handler
 * @param immediate
 */
export function listenerDeptChange(handler, immediate = true) {
	emitter.on(key, handler);
	if (immediate && latestDept) {
		handler(latestDept);
	}
}

/**
 * 删除当前所在科室变化监听
 */
export function removeDeptListener() {
	emitter.off(key);
}
