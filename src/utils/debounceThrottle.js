/**
 * 这个代码定义了一个名为 DebounceThrottle 的类，其中包含了 debounce 和 throttle 两个方法。
 * 与之前的实现不同的是，这里我们将 timeoutId 和 inThrottle 作为类的属性进行管理，并在 debounce 和 throttle 方法中使用箭头函数来简化代码。
 *
 * 需要注意的是，在 throttle 方法中，我们使用了 setTimeout 来设置限流时间，并在回调函数中重置了 inThrottle 属性的值以便于再次触发。
 * 而在防抖函数 debounce 中，我们使用了 clearTimeout 来清除原有的 timeoutId，让目标函数在延迟时间到达后再次触发。
 */
class DebounceThrottle {
	constructor() {
		this.timeoutId = null;
		this.inThrottle = false;
	}

	/**
	 * 防抖函数
	 * @param func 执行方法
	 * @param delay 延迟时间
	 * @returns {(function(...[*]): void)|*}
	 */
	debounce(func, delay) {
		return (...args) => {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
			}
			this.timeoutId = setTimeout(() => {
				func(...args);
			}, delay);
		};
	}

	/**
	 * 节流函数
	 * @param func 执行的函数
	 * @param limit 间隔时间
	 * @returns {(function(...[*]): void)|*}
	 */
	throttle(func, limit) {
		return (...args) => {
			if (!this.inThrottle) {
				func(...args);
				this.inThrottle = true;
				setTimeout(() => {
					this.inThrottle = false;
				}, limit);
			}
		};
	}
}

const debounceThrottle = new DebounceThrottle();

export default debounceThrottle;
