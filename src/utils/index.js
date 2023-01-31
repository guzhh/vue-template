/**
 * 将传递的百分比与 HEX 颜色的 R、G 或 B 相加
 * @param {string} color 要改变的颜色
 * @param {number} amount 改变颜色的数量
 * @returns {string} 颜色的加工部分
 */
function addLight(color, amount) {
	const cc = parseInt(color, 16) + amount;
	const c = cc > 255 ? 255 : cc;
	return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}

/**
 * 根据通过的百分比使 6 个字符的 HEX 颜色变亮
 * @param {string} color 要改变的颜色
 * @param {number} amount 改变颜色的数量
 * @returns {string} 处理后的颜色表示为 HEX
 */
export function lighten(color, amount) {
	const colors = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
	const amounts = Math.trunc((255 * amount) / 100);
	return `#${addLight(colors.substring(0, 2), amounts)}${addLight(colors.substring(2, 4), amounts)}${addLight(
		colors.substring(4, 6),
		amounts
	)}`;
}

/**
 * 16进制色值获取反色设置方法
 * @param  {String} oldColor 为16进制色值的字符串（例：'#000000'）
 * @return {String} 返回反色的色值（例：'#ffffff'）
 */
export function colorReverse(oldColor) {
	const colors = `0x${oldColor.replace(/#/g, "")}`;
	const str = `000000${(0xffffff - colors).toString(16)}`;
	return `#${str.substring(str.length - 6, str.length)}`;
}
