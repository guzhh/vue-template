import { defineStore } from "pinia";
import defaultSettings from "@/config/settings.js";
import useUserStore from "@/store/modules/user/index";
import { generatorDynamicRouter } from "@/router/constants";

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
		async fetchServerMenuConfig(router) {
			const userStore = useUserStore();
			// console.log("-------", userStore.resourceList);
			const routes = await generatorDynamicRouter(userStore.resourceList, router);
			this.serverMenu = routes;
		}
	}
});

export default useAppStore;
