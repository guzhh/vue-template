import NProgress from "nprogress";
import { setRouteEmitter } from "@/utils/route-listener";
import setupUserLoginInfoGuard from "./userLoginInfo";
import setupPermissionGuard from "./permission";
import setupVersionGuard from "./version";

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
	setupVersionGuard(router); // 检测版本

	// router.be
	// 路由后置拦截器
	router.afterEach(() => {
		NProgress.done(); // 完成进度栏
	});
}
