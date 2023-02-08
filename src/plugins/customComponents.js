import PageContent from "@/components/PageContent/index.vue";
import OptionBadge from "@/components/OptionBadge/index.vue";
import SearchBox from "@/components/SearchBox/index.vue";

/**
 * 全局注册自定义组件 待完善
 * @param app
 */
export function setupCustomComponents(app) {
	const comp = { PageContent, OptionBadge, SearchBox };
	Object.keys(comp).forEach(key => {
		app.component(key, comp[key]);
	});
}
