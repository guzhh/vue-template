export const constantRouterComponents = {
	DEFAULT_LAYOUT: () => import("@/layout/default-layout.vue"),
	LINK_LAYOUT: () => import("@/layout/link-layout.vue"),
	PAGE_VIEW: () => import("@/layout/page-view.vue"),
	LINK_VIEW: () => import("@/layout/link-view.vue"),
	// --------------------系统管理
	user: () => import("@/views/system/user/index.vue"), // 用户管理
	resource: () => import("@/views/system/resource/index.vue"), // 资源管理
	paramList: () => import("@/views/system/param/index.vue"), // 参数管理
	childSys: () => import("@/views/system/childSys/index.vue"), // 子系统管理
	dict: () => import("@/views/system/dict/index.vue"), // 字典管理
	role: () => import("@/views/system/role/index.vue"), // 角色管理
	orgAdmin: () => import("@/views/basic/orgAdmin/index.vue"), // 机构管理
	depAdmin: () => import("@/views/basic/depAdmin/index.vue"), // 科室管理
	projectDependency: () => import("@/views/projectDependency/index.vue"), // 项目依赖

	// 前端项目生成器
	tableGenerator: () => import("@/views/generator/tableGenerator/index.vue"), // 表格生成器

	// 组件、功能
	richText: () => import("@/views/other/richText/index.vue") // 富文本编辑器
};
