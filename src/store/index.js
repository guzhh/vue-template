import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import useSystemStore from "@/store/modules/system";

export function setupStore(app) {
	const pinia = createPinia();
	pinia.use(piniaPluginPersist);
	app.use(pinia);
	useSystemStore().getAllParam();
}
