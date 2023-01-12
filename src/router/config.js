export const constantRouterComponents = {
	DEFAULT_LAYOUT: () => import("@/layout/default-layout.vue"),
	// --------------------系统管理
	user: () => import("@/views/system/user/index.vue")
};
