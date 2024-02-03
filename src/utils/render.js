import { h } from "vue";
import { NIcon } from "naive-ui";

export const renderIcon = (icon, props) => {
	return () => {
		if (!icon) return null;
		return h(NIcon, props || null, {
			default: () => h(icon)
		});
	};
};
