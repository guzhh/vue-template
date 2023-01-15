import { defineStore } from "pinia";
import defaultSettings from "@/config/settings.js";
import useUserStore from "@/store/modules/user/index";
import { setTreeData } from "@/utils/tree";

const useAppStore = defineStore("app", {
	state: () => ({ ...defaultSettings }),
	getters: {
		appCurrentSetting(state) {
			return { ...state };
		},
		appDevice(state) {
			return state.device;
		},
		appAsyncMenus(state) {
			return state.serverMenu;
		}
	},
	actions: {
		updateSettings(partial) {
			this.$patch(partial);
		},
		// 更改主题颜色
		toggleTheme(dark) {
			if (dark) {
				this.theme = "dark";
				document.documentElement.setAttribute("naive-theme", "dark");
			} else {
				this.theme = "light";
				document.documentElement.removeAttribute("naive-theme");
			}
		},
		toggleDevice(device) {
			this.device = device;
		},
		toggleMenu(value) {
			this.hideMenu = value;
		},
		async fetchServerMenuConfig() {
			const userStore = useUserStore();
			const menus = userStore.resourceList.filter(item => item.meta.type === 1);
			this.serverMenu = setTreeData(menus, "id", "pid");
		}
	},
	persist: {
		enabled: true, // 开启store持久化
		strategies: [
			{
				key: "panku_app_state",
				storage: localStorage,
				paths: [
					"navbar",
					"menu",
					"hideMenu",
					"menuCollapse",
					"footer",
					"themeColor",
					"menuWidth",
					"globalSettings",
					"tabBar",
					"device"
				]
			}
		]
	}
});

export default useAppStore;
