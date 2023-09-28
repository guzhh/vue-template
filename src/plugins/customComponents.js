import PageContent from "@/components/PageContent/index.vue"; // 页面骨架
import OptionBadge from "@/components/OptionBadge/index.vue"; // 选项徽标
import SearchBox from "@/components/SearchBox/index.vue"; // 表格搜索弹框
import WangEditor from "@/components/WangEditor/index.vue"; // 富文本
import BaseModal from "@/components/BaseModal/index.vue"; // 弹窗组件
import CodeEditor from "@/components/CodeEditor/index.vue"; // 代码编辑器组件
import CardHeader from "@/components/cardHeader/index.vue";
import { DictSelect, DictMulti, DictShow, DictRadio, DictValueShow, DictCodeShow } from "@/components/DictSelect/index";

/**
 * 全局注册自定义组件 待完善
 * @param app
 */
export function setupCustomComponents(app) {
	const comp = {
		PageContent,
		OptionBadge,
		SearchBox,
		WangEditor,
		DictMulti,
		DictSelect,
		DictShow,
		DictRadio,
		DictCodeShow,
		BaseModal,
		CodeEditor,
		DictValueShow,
		CardHeader
	};
	Object.keys(comp).forEach(key => {
		app.component(key, comp[key]);
	});
}
