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

/**
 * 数字转大写金额
 * @param {*} number
 * @returns {String} String
 */
export function numberToUppercase(num) {
	let number = num;
	if (typeof number !== "number") {
		console.warn(`${number} 不是数字类型`);
		return number;
	}
	if (number > 999999999999.999) {
		console.warn(`${number} 超出数字范围`);
		return number;
	}
	number = number.toString();
	// 大写数字
	const upper = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
	const small = ["角", "分", "厘"];
	const digit = ["", "拾", "佰", "仟"];
	const level = ["元", "万", "亿"];
	// 是否为负数
	const isMinus = number.includes("-");
	if (isMinus) number = number.replace("-", "");
	// 是否有小数
	const hasDecimal = number.includes(".");
	// 分离整数部分和小数部分
	let integerPart;
	let decimalPart;
	if (hasDecimal) {
		const [n, d] = Number(number).toFixed(3).split(".");
		integerPart = n.split("").map(Number);
		decimalPart = d.split("").map(Number);
	} else {
		integerPart = number.split("").map(Number);
	}
	/* 处理整数部分 */
	const integer = integerPart.reduce((res, n, i) => {
		const index = integerPart.length - i - 1;
		const idx = Math.floor(index / 4);
		// eslint-disable-next-line no-param-reassign
		const current = res[idx] ? res[idx] : (res[idx] = []);
		// upper[n] : // 转换对应的中文大写
		// n > 0 数字大于0，则添加“拾,佰,仟”到数字后面
		current.push(upper[n] + (n > 0 ? digit[index % digit.length] : ""));
		return res;
	}, []);
	const integerValue = integer.reverse().reduce((pre, val, i) => {
		const index = integer.length - i - 1;
		// 替换连续的零，仅保留一个"零"
		let cur = val.join("").replace(/零+/g, "零");
		// 去除前末尾和当前第一位为零的"零"
		if (pre[pre.length - 1] === "零" && cur.indexOf("零") === 0) {
			cur = cur.substring(1, cur.length - 1);
		}
		// 去除最后一位"零"
		if (cur.lastIndexOf("零") === cur.length - 1) {
			cur = cur.substring(-1, cur.length - 1);
		}
		return pre + cur + level[index];
	}, "");
	/* 处理小数部分 */
	let decimal;
	if (decimalPart) {
		decimal = decimalPart.reduce((res, n, i) => {
			// 转换对应的中文大写
			const value = upper[n];
			// n > 0 数字大于0，则添加“角,分,厘”到数字后面
			let current = value + (n > 0 ? small[i] : "");
			// 小数最后一位为零，则去除
			if (i === decimalPart.length - 1 && value === "零") {
				current = "";
			}
			return res + current;
		}, "");
		// 替换连续的零，仅保留一个"零"
		decimal = decimal.replace(/零+/g, "零");
	}
	// 合并数字
	const result = !hasDecimal ? `${integerValue}整` : `${integerValue}${decimal}`;
	// 为负数添加符号
	return (isMinus ? "负" : "") + result;
}

/**
 * @description 转换整数部分的函数
 * @param {Number} num 需要转换的整数
 * @return {String} 返回转换后的中文大写
 */
function intNumberToChinese(num) {
	// 单个数字字符对应的中文大写
	const cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
	// 数字位数对应的中文大写
	const cnIntRadice = ["", "拾", "佰", "仟"];
	// 整数部分额外的中文大写
	const cnIntUnits = ["", "万", "亿", "兆"];

	let cnStr = ""; // 中文大写字符串
	let suffix = ""; // 整数部分额外的中文大写

	let i = 0;
	while (num > 0) {
		// 依次处理个、十、百、千位
		const n = num % 10;
		if (i === 0 && n === 0) {
			// 如果个位是 0，且当前是整数部分，则不添加零
			suffix = "";
		} else {
			cnStr = cnNums[n] + cnIntRadice[i] + cnStr; // 拼接当前位的中文大写
			suffix = "";
		}

		if (i === 3 && num >= 1000 && num % 10000 !== 0) {
			// 已经处理到千位且还有整千以上的数，添加额外的中文大写
			cnStr = cnIntUnits[1] + cnStr;
		}
		if (i === 7 && num >= 10000000 && num % 100000000 !== 0) {
			// 已经处理到亿位且还有整亿以上的数，添加额外的中文大写
			cnStr = cnIntUnits[2] + cnStr;
		}
		if (i === 11 && num >= 100000000000 && num % 1000000000000 !== 0) {
			// 已经处理到兆位且还有整兆以上的数，添加额外的中文大写
			cnStr = cnIntUnits[3] + cnStr;
		}

		// eslint-disable-next-line no-param-reassign
		num = Math.floor(num / 10);
		i++;
	}

	// 去掉末尾的零
	cnStr = cnStr.replace(/零拾/g, "零"); // 去掉连续的零拾
	cnStr = cnStr.replace(/零佰/g, "零"); // 去掉连续的零佰
	cnStr = cnStr.replace(/零千/g, "零"); // 去掉连续的零千
	cnStr = cnStr.replace(/零{2,}/g, "零"); // 去掉多余的零
	cnStr = cnStr.replace(/^零+/, ""); // 去掉开头的零

	return cnStr + suffix;
}

/**
 * @description 转换小数部分的函数
 * @param {Number} num 需要转换的小数
 * @return {String} 返回转换后的中文大写
 */
function decimalNumberToChinese(num) {
	// 单个数字字符对应的中文大写
	const cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];

	let cnStr = ""; // 中文大写字符串

	for (let i = 0; i < num.toString().length; i++) {
		const n = parseInt(num.toString()[i], 10);
		cnStr += cnNums[n];
	}

	return cnStr;
}

/**
 * @description 数字转中文大写的函数
 * @param {Number} num 需要转换的数字
 * @return {String} 返回转换后的中文大写
 */
export function numberToChinese(num) {
	// 单个数字字符对应的中文大写
	const cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];

	let cnStr = ""; // 中文大写字符串

	if (num === 0) {
		// 特殊处理 0
		return cnNums[0];
	}

	if (num < 0) {
		// 处理负数
		cnStr += "负";
		// eslint-disable-next-line no-param-reassign
		num = Math.abs(num);
	}

	if (num.toString().indexOf(".") !== -1) {
		// 判断是否有小数部分
		const parts = num.toString().split(".");
		const integerPart = parseInt(parts[0], 10); // 整数部分
		const decimalPart = parseInt(parts[1], 10); // 小数部分

		cnStr += intNumberToChinese(integerPart); // 转换整数部分
		if (decimalPart > 0) {
			// 处理小数部分
			cnStr += "点";
			cnStr += decimalNumberToChinese(decimalPart);
		}
	} else {
		// 只有整数部分
		cnStr += intNumberToChinese(num);
	}

	return cnStr;
}

/**
 * 获取两日期之间日期列表函数
 * 返回两个时间之间所有的日期
 * 参数示例 （'2021-05-31','2021-06-30'）
 * * */
export const getTimeTwo = (start, end) => {
	// 初始化日期列表，数组
	const diffdate = [];
	let i = 0;
	// 开始日期小于等于结束日期,并循环
	while (start <= end) {
		diffdate[i] = start;
		// 获取开始日期时间戳
		const stimeTs = new Date(start).getTime();
		// 增加一天时间戳后的日期
		const nextDate = stimeTs + 24 * 60 * 60 * 1000;
		// 拼接年月日，这里的月份会返回（0-11），所以要+1
		const nextDatesY = `${new Date(nextDate).getFullYear()}-`;
		const nextDatesM =
			new Date(nextDate).getMonth() + 1 < 10 ? `0${new Date(nextDate).getMonth() + 1}-` : `${new Date(nextDate).getMonth() + 1}-`;
		const nextDatesD = new Date(nextDate).getDate() < 10 ? `0${new Date(nextDate).getDate()}` : new Date(nextDate).getDate();
		// eslint-disable-next-line no-param-reassign
		start = nextDatesY + nextDatesM + nextDatesD;
		// 增加数组key
		i++;
	}
	return diffdate;
};

/**
 * 获取特定格式化的日期
 * 返回格式化后的日期
 * 参数示例 （'YYYY-mm-dd',new Date()）
 * * */

// eslint-disable-next-line import/prefer-default-export
export function dateFormat(fmt, date) {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};

	// eslint-disable-next-line no-restricted-syntax,guard-for-in
	for (const k in opt) {
		ret = new RegExp(`(${k})`).exec(fmt);
		if (ret) {
			// eslint-disable-next-line no-param-reassign
			fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
		}
	}
	return fmt;
}

/**
 * 只取对象中想要的属性
 * 返回赋值后想要的对象
 * 参数示例 （{id:1,code:'123'},{code:''}）
 * * */

export function extractionFun(data, formFields) {
	const obj = Object.keys(formFields).reduce((object, item) => {
		if (item in data) {
			// eslint-disable-next-line no-param-reassign
			object[item] = data[item];
		}
		return object;
	}, {});
	return obj;
}
