export const constantRouterComponents = {
	DEFAULT_LAYOUT: () => import("@/layout/default-layout.vue"),
	// --------------------系统管理
	user: () => import("@/views/system/user/index.vue"), // 用户管理
	resource: () => import("@/views/system/resource/index.vue") // 资源管理
};
