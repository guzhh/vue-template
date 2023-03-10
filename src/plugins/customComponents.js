import PageContent from "@/components/PageContent/index.vue"; // 页面骨架
import OptionBadge from "@/components/OptionBadge/index.vue"; // 选项徽标
import SearchBox from "@/components/SearchBox/index.vue"; // 表格搜索弹框
import WangEditor from "@/components/WangEditor/index.vue"; // 富文本
import { DictMulti, DictSelect, DictShow } from "@/components/DictSelect/index";

/**
 * 全局注册自定义组件 待完善
 * @param app
 */
export function setupCustomComponents(app) {
	const comp = { PageContent, OptionBadge, SearchBox, WangEditor, DictMulti, DictSelect, DictShow };
	Object.keys(comp).forEach(key => {
		app.component(key, comp[key]);
	});
}
