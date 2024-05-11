export const getOptionFind = (options, val) => {
	let option = options.find(item => item.value === val);
	if (!option) {
		option = { label: "未知", type: "info" };
	}
	return option;
};

/**
 * 主要用于select组件动态查看分页
 * @type {number}
 */
export const page = { pageSize: 10, pageNo: 1 };

export const ifUse = [
	{ label: "启用", value: 1, color: "#2878fc" },
	{ label: "禁用", value: 0, color: "#ff5b5a" }
];
