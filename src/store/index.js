import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import useSystemStore from "@/store/modules/system";

export async function setupStore(app) {
	const pinia = createPinia();
	pinia.use(piniaPluginPersist);
	app.use(pinia);
	try {
		await useSystemStore().getAllParam();
	} catch (e) {
		console.error("全局系统参数获取失败");
	}
}
