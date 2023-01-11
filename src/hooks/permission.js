import { useUserStore } from "@/store";

export default function usePermission() {
	const userStore = useUserStore();
	return {
		// 判断当前路由当前用户是否有权限访问
		accessRouter(route) {
			return (
				!route.meta?.requiresAuth ||
				!route.meta?.roles ||
				route.meta?.roles?.includes("*") ||
				route.meta?.roles?.includes(userStore.roleList)
			);
		}
	};
}
