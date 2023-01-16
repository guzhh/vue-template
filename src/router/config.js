export const constantRouterComponents = {
	DEFAULT_LAYOUT: () => import("@/layout/default-layout.vue"),
	// --------------------系统管理
	user: () => import("@/views/system/user/index.vue"), // 用户管理
	resource: () => import("@/views/system/resource/index.vue"), // 资源管理
	paramList: () => import("@/views/system/param/paramList.vue"), // 参数管理
	childSys: () => import("@/views/system/childSys/childSys.vue"), // 子系统管理
	dict: () => import("@/views/system/dict/dictList.vue"), // 字典管理
	role: () => import("@/views/system/role/index.vue") // 角色管理
};
