import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import useUserStore from "./modules/user";
import useAppStore from "./modules/app";
import useTabBarStore from "./modules/tab-bar";
import useSystemStore from "./modules/system";

export { useUserStore, useAppStore, useTabBarStore, useSystemStore };

export function setupStore(app) {
	const pinia = createPinia();
	pinia.use(piniaPluginPersist);
	app.use(pinia);
}
