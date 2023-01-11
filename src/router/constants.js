import { setTreeData } from "@/utils/tree";
import { constantRouterComponents } from "@/router/config";
import NotPage from "@/views/exception/403.vue";
import { NOT_FOUND_ROUTE, REDIRECT_MAIN } from "@/router/routes/base";

export const WHITE_LIST = [
	{ name: "notFound", children: [] },
	{ name: "login", children: [] }
];

export const NOT_FOUND = {
	name: "notFound"
};

export const generator = (routerMap, route) => {
	return routerMap.map(item => {
		const currentRouter = {
			path: `${item.url}`,
			name: item.url, // 路由名称，建议唯一
			// 该路由对应页面的 组件
			component: constantRouterComponents[item.component || item.key] || NotPage,
			// meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
			meta: {
				routerPath: route ? `${route.meta.routerPath}/${item.url}` : `/${item.url}`,
				icon: item.icon || "", // 图标显示在侧边菜单中
				locale: item.name, // 区域设置名称显示在侧边菜单和痕迹导航中
				hideInMenu: item.hidden === 1 || item.type !== 1, // 如果为 true，则不会显示在侧边菜单中
				hideChildrenInMenu: item.hideChildren === 1, // 如果设置为 true，则子项不会显示在侧边菜单中
				// activeMenu?: string; // 如果设置了名称，菜单将根据您设置的名称突出显示
				// order?: number; // 对路由菜单项进行排序。如果设置键，则值越高，它越向前
				noAffix: item.hidden !== 1 && item.typeFlag === 1, // 如果设置为 true，则标签将不会贴在选项卡栏中
				ignoreCache: item.ifcache === 1 // 如果设置为 true，则不会缓存该页面
			}
		};
		// 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
		currentRouter.path = currentRouter.path.replace(/(\/)+/g, "/");
		// 重定向
		// 是否有子菜单，并递归处理
		if (item.children && item.children.length > 0) {
			// Recursion
			currentRouter.children = generator(item.children, currentRouter);
			// 将父级路由重定向到子路由
			currentRouter.redirect = `${currentRouter.children[0].meta.routerPath}`.replace(/(\/)+/g, "/");
		}
		return currentRouter;
	});
};

/**
 * 动态生成菜单
 * @param routeList
 * @returns {Promise<unknown>}
 */
export const generatorDynamicRouter = (routeList, router) => {
	return new Promise(resolve => {
		// 过滤按钮和外部链接
		const list = routeList.filter(item => {
			return item.typeFlag !== 2;
		});
		// 将线性路由格式化为树状路由
		const treeList = setTreeData(list, "id", "pid");
		const routes = generator(treeList);
		const routeTreeList = [
			{
				path: "/",
				redirect: routes.length > 0 ? routes[0].path : "login",
				children: routes
			},
			REDIRECT_MAIN,
			NOT_FOUND_ROUTE
		];
		routeTreeList.forEach(item => {
			router.addRoute(item);
		});
		resolve(routes);
	});
};
