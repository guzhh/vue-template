import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import useUserStore from "./modules/user";
import useAppStore from "./modules/app";

export { useUserStore, useAppStore };

export function setupStore(app) {
	const pinia = createPinia();
	pinia.use(piniaPluginPersist);
	app.use(pinia);
}
