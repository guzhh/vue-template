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
			],
			eslintrc: {
				enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
				filepath: "./.eslintrc-auto-import.json", // 生成json文件
				globalsPropValue: true
			}
		}),
		Components({
			resolvers: [NaiveUiResolver()]
		})
	];
	return plugins;
}
