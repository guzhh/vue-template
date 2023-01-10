import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default function configNaiveResolverPlugin() {
	const plugins = [
		AutoImport({
			imports: [
				"vue",
				{
					"naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"]
				}
			]
		}),
		Components({
			resolvers: [NaiveUiResolver()]
		})
	];
	return plugins;
}
