import { useRouter } from "vue-router";
import useUserStore from "@/store/modules/user";

export default function useUser() {
	const router = useRouter();
	const userStore = useUserStore();
	const logout = async logoutTo => {
		window.$dialog.info({
			title: "退出确认",
			content: "请问您是否确认退出登录？",
			positiveText: "确定",
			negativeText: "取消",
			onPositiveClick: async () => {
				await userStore.logout();
				const currentRoute = router.currentRoute.value;
				window.$message.success("退出成功");
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
