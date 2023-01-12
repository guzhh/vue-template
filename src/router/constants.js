import { constantRouterComponents } from "@/router/config";
import NotPage from "@/views/exception/403.vue";
import NotPage404 from "@/views/exception/404.vue";
import { NOT_FOUND_ROUTE, REDIRECT_MAIN } from "@/router/routes/base";

export const WHITE_LIST = [
	{ name: "notFound", children: [] },
	{ name: "login", children: [] }
];

export const NOT_FOUND = {
	name: "notFound"
};

export const generator = routerMap => {
	return routerMap.map(item => {
		const currentRouter = {
			path: `${item.url}`,
			name: item.url, // 路由名称，建议唯一
			// 该路由对应页面的 组件
			component: item.linkType !== 1 ? constantRouterComponents[item.compName] || NotPage : NotPage404,
			// meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
			meta: {
				linkType: item.linkType, // 1外部全链接 2内部全连接 3内部相对链接
				linkValue: item.linkValue, // 链接值
				icon: item.icon || "", // 图标显示在侧边菜单中
				title: item.name, // 区域设置名称显示在侧边菜单和痕迹导航中
				hideInMenu: item.hidden === 1 || item.type !== 1, // 如果为 true，则不会显示在侧边菜单中
				hideChildrenInMenu: item.hideChildren === 1, // 如果设置为 true，则子项不会显示在侧边菜单中
				// activeMenu?: string; // 如果设置了名称，菜单将根据您设置的名称突出显示
				// order?: number; // 对路由菜单项进行排序。如果设置键，则值越高，它越向前
				noAffix: item.linkType !== 1 || item.hidden === 1 || item.typeFlag !== 1, // 如果设置为 true，则标签将不会贴在选项卡栏中  (item.hidden !== 1 && item.typeFlag === 1)
				ignoreCache: item.ifcache === 1 // 如果设置为 true，则不会缓存该页面
			}
		};
		// 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
		currentRouter.path = currentRouter.path.replace(/(\/)+/g, "/");
		// 重定向
		// 是否有子菜单，并递归处理
		if (item.children && item.children.length > 0) {
			// Recursion
			currentRouter.children = generator(item.children);
			// 将父级路由重定向到子路由
			currentRouter.redirect = `${currentRouter.children[0].meta.routerPath}`.replace(/(\/)+/g, "/");
		}
		return currentRouter;
	});
};

export function formatTheRoute(data) {
	const cloneData = JSON.parse(JSON.stringify(data)); // 对源数据深度克隆,防止污染原始数据
	return cloneData.filter(father => {
		// 该路由对应页面的 组件
		// eslint-disable-next-line no-param-reassign
		father.component = constantRouterComponents[father.component] || NotPage;
		const branchArr = cloneData.filter(child => parseInt(father.id, 10) === parseInt(child.pid, 10)); // 返回每一项的子级数组
		// eslint-disable-next-line no-unused-expressions,no-param-reassign
		branchArr.length > 0 ? (father.children = branchArr) : ""; // 如果存在子级，则给父级添加一个children属性，并赋值
		return parseInt(father.pid, 10) === 0; // 返回第一层
	});
}

/**
 * 动态生成菜单、路由
 * @param routeList
 * @returns {Promise<unknown>}
 */
export const generatorDynamicRouter = (routeList, router) => {
	return new Promise(resolve => {
		// 过滤 按钮 和 外部链接
		const routerList = routeList.filter(item => item.meta.type !== 2 && item.meta.linkType !== 1);
		// 将线性路由格式化为树状路由
		const routes = formatTheRoute(routerList);
		const routeTreeList = [
			{ path: "/", name: "home", redirect: routes.length > 0 ? routes[0].path : "login", children: routes },
			REDIRECT_MAIN,
			NOT_FOUND_ROUTE
		];
		routeTreeList.forEach(item => router.addRoute(item));
		resolve(routes);
	});
};

export const formatTheResource = routeList => {
	//  资源类型 1 菜单 2按钮 3扩展页面
	return routeList.map(item => {
		return {
			id: item.id,
			pid: item.pid,
			path: `${item.url}`,
			name: item.url, // 路由名称，唯一
			component: item.compName, // 组件名称
			// meta: 页面标题, 菜单图标
			meta: {
				type: item.type, // 资源类型 1 菜单 2按钮 3扩展页面
				linkType: item?.linkType, // 1外部全链接 2内部全连接 3内部相对链接
				linkValue: item?.linkValue, // 链接值
				icon: item.icon || "", // 图标显示在侧边菜单中
				title: item.name, // 区域设置名称显示在侧边菜单和痕迹导航中
				hideInMenu: item.hidden === 1 || item.type !== 1, // 如果为 true，则不会显示在侧边菜单中
				hideChildrenInMenu: item.hideChildren === 1, // 如果设置为 true，则子项不会显示在侧边菜单中
				noAffix: item.linkType !== 1 || item.hidden === 1 || item.typeFlag !== 1, // 如果设置为 true，则标签将不会贴在选项卡栏中  (item.hidden !== 1 && item.typeFlag === 1)
				ignoreCache: item.ifcache === 1 // 如果设置为 true，则不会缓存该页面
			}
		};
	});
};
