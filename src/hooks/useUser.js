import { useRouter } from "vue-router";

import { useUserStore } from "@/store";

export default function useUser() {
	const router = useRouter();
	const userStore = useUserStore();
	const logout = async logoutTo => {
		window.$dialog.warning({
			title: "退出确认",
			content: "请问您是否确认退出登录？",
			positiveText: "确定",
			negativeText: "不确定",
			onPositiveClick: async () => {
				await userStore.logout();
				const currentRoute = router.currentRoute.value;
				window.$message.success("登出成功");
				await router.push({
					name: logoutTo && typeof logoutTo === "string" ? logoutTo : "login",
					query: {
						...router.currentRoute.value.query,
						redirect: currentRoute.name
					}
				});
			}
		});
	};
	return {
		logout
	};
}
