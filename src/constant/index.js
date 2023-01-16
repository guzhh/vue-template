import { h } from "vue";
import { NBadge } from "naive-ui";

export const getOptionFind = (options, val) => {
	let option = options.find(item => item.value === val);
	if (!option) {
		option = { label: "未知", type: "info" };
	}
	return h("span", null, [
		h(NBadge, {
			dot: true,
			type: option.type
		}),
		option.label
	]);
};
