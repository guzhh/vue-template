export const DEFAULT_LAYOUT = () => import("@/layout/default-layout.vue");

/**
 * 一些基础的其他路由
 * @type {{path: string, component: (function(): Promise<{}>), children: [{path: string, component: (function(): Promise<{}>), meta: {title: string}, name: string}], meta: {title: string}, name: string}}
 */
export const BASE_MAIN = {
	// path: "user",
	// name: "userPersonal",
	// component: () => import("@/layout/default-layout.vue"),
	// meta: {
	// 	title: "基础数据",
	// 	noAffix: false, // 是否显示标签页
	// 	ignoreCache: false // 是否缓存
	// },
	// children: [
	// 	{
	// 		path: "personal",
	// 		name: "personal",
	// 		component: () => import("@/views/users/personal/index.vue"),
	// 		meta: {
	// 			title: "基础数据",
	// 			noAffix: false, // 是否显示标签页
	// 			ignoreCache: false // 是否缓存
	// 		}
	// 	}
	// ],
	path: "/sssss",
	name: "sssss",
	component: () => import("@/views/users/login/index.vue"),
	meta: {
		title: "登录"
	}
};

// 重定向包装器
export const REDIRECT_MAIN = {
	path: "/redirect",
	name: "redirectWrapper",
	component: DEFAULT_LAYOUT,
	meta: {
		noAffix: true,
		ignoreCache: false // 是否缓存
	},
	children: [
		{
			path: "/redirect/:path",
			name: "Redirect",
			component: () => import("@/views/exception/redirect.vue"),
			meta: {
				requiresAuth: true,
				hideInMenu: true
			}
		}
	]
};

export const NOT_FOUND_ROUTE = {
	path: "/:pathMatch(.*)*",
	name: "notFound",
	component: () => import("@/views/exception/404.vue")
};
