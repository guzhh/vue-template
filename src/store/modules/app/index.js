import { defineStore } from "pinia";
import defaultSettings from "@/config/settings.js";
import useUserStore from "@/store/modules/user/index";
import { setTreeData } from "@/utils/tree";

const useAppStore = defineStore("app", {
	state: () => ({ ...defaultSettings, serverMenu: [], serverRoutes: [] }),
	getters: {
		appCurrentSetting(state) {
			return { ...state };
		},
		appDevice(state) {
			return state.device;
		},
		// 路由表缓存
		appAsyscRoutes(state) {
			return state.serverRoutes;
		},
		appAsyncMenus(state) {
			return state.serverMenu;
		},
		appThemeColor(state) {
			return state.themeColor;
		}
	},
	actions: {
		updateSettings(partial) {
			this.$patch(partial);
		},
		// 更改主题
		toggleTheme(dark) {
			// if (dark) {
			// 	this.theme = "dark";
			// 	document.documentElement.setAttribute("naive-theme", "dark");
			// } else {
			// 	this.theme = "light";
			// 	document.documentElement.removeAttribute("naive-theme");
			// }
			if (dark) {
				this.theme = "dark";
				document.body.setAttribute("naive-theme", "dark");
			} else {
				this.theme = "light";
				document.body.removeAttribute("naive-theme");
			}
		},
		toggleDevice(device) {
			this.device = device;
		},
		toggleMenu(value) {
			this.hideMenu = value;
		},

		// 设置系统主题色
		toggleThemeColor(value) {
			this.themeColor = value;
		},

		// 设置侧边栏样式
		toggleSideTheme(val) {
			this.sideTheme = val;
		},

		async fetchServerMenuConfig() {
			const userStore = useUserStore();
			const menus = userStore.resourceList.filter(item => {
				return item.meta.type === 1 && !item.meta.hideInMenu;
			});
			this.serverMenu = setTreeData(menus, "id", "pid");
		},

		async fetchServerRouteConfig(routes) {
			this.serverRoutes = JSON.parse(JSON.stringify(routes));
		}
	},
	persist: {
		enabled: true, // 开启store持久化
		strategies: [
			{
				key: `${import.meta.env.BASE_URL}_panku_app_state`,
				storage: localStorage,
				paths: Object.keys(defaultSettings)
			}
		]
	}
});

export default useAppStore;
