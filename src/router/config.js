// eslint-disable-next-line no-unused-vars
const modules = import.meta.glob("@/views/**/page.js", { eager: true });

const constantRouterComponents = {
	DEFAULT_LAYOUT: () => import("@/layout/default-layout.vue"),
	LINK_LAYOUT: () => import("@/layout/link-layout.vue"),
	PAGE_VIEW: () => import("@/layout/page-view.vue"),
	LINK_VIEW: () => import("@/layout/link-view.vue")
};
// eslint-disable-next-line guard-for-in,no-restricted-syntax
for (const path in modules) {
	const module = modules[path];
	if (!module.default.name || !module.default.components) {
		console.error(
			new Error(`路径：${path},配置文件格式有问题请仔细核对。配置示例：
export default {
  name: "dict",
  components: () => import("@/views/system/dict/index.vue")
};`)
		);
	} else {
		constantRouterComponents[module.default.name] = module.default.components;
	}
}

export { constantRouterComponents };
