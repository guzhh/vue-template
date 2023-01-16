import { useAppStore, useUserStore } from "@/store";
import usePermission from "@/hooks/permission";
import { generatorDynamicRouter, NOT_FOUND, WHITE_LIST } from "../constants";

export default function setupPermissionGuard(router) {
	router.beforeEach(async (to, from, next) => {
		const appStore = useAppStore();
		const userStore = useUserStore();
		const Permission = usePermission();
		const permissionsAllow = Permission.accessRouter(to);

		if (!appStore.appAsyncMenus.length && !WHITE_LIST.find(el => el.name === to.name)) {
			// 生成动态路由
			await generatorDynamicRouter(userStore.resourceList, router);
			// 生成动态菜单
			await appStore.fetchServerMenuConfig();
			next({ ...to, replace: true });
		} else {
			// 拿到
			const serverMenuConfig = [...appStore.appAsyncMenus, ...WHITE_LIST];

			// 循环判断当前访问的资源是否在路由表中
			let exist = false;
			while (serverMenuConfig.length && !exist) {
				const element = serverMenuConfig.shift();
				if (element?.name === to.name) exist = true;

				if (element?.children) {
					serverMenuConfig.push(...element.children);
				}
			}
			if (exist && permissionsAllow) {
				next();
			} else next(NOT_FOUND);
		}
	});
}
