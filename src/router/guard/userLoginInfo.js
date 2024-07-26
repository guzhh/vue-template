import NProgress from "nprogress";
import useUserStore from "@/store/modules/user";
import { isLogin } from "@/utils/auth";
import { ROUTE_WHITELIST } from "@/router/routes/custom";

const WHITE_LIST = ["/login", ...ROUTE_WHITELIST];
export default function setupUserLoginInfoGuard(router) {
	router.beforeEach(async (to, from, next) => {
		NProgress.start();
		const userStore = useUserStore();
		// 判断是否有登录
		if (isLogin()) {
			// 判断是否有角色
			if (userStore.roleList && userStore.roleList.length > 0) {
				next();
			} else {
				try {
					// 获取用户信息
					await userStore.info();
					next();
				} catch (error) {
					// 获取用户信息失败 退出登录
					await userStore.logout();
					next({ name: "login", query: { redirect: to.name, ...to.query } });
				}
			}
		} else {
			if (WHITE_LIST.includes(to.path) || to.meta.requiresAuth) {
				next();
				return;
			}
			next({
				name: "login",
				query: {
					redirect: to.name,
					...to.query
				}
			});
		}
	});
}
