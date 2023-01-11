import { setRouteEmitter } from "@/utils/route-listener";
import setupUserLoginInfoGuard from "./userLoginInfo";
import setupPermissionGuard from "./permission";

/**
 * 监听路由改变
 * @param router
 */
function setupPageGuard(router) {
	router.beforeEach(async to => {
		// 发出路由更改
		setRouteEmitter(to);
	});
}

export default function createRouteGuard(router) {
	setupPageGuard(router); // 监听路由变化
	setupUserLoginInfoGuard(router); // 监听用户是否登录
	setupPermissionGuard(router); // 资源权限控制
}
