import { mergeConfig } from "vite";
import baseConfig from "./vite.config.base";
import configVisualizerPlugin from "./plugin/visualizer.js";
import configImageminPlugin from "./plugin/imagemin.js";
import configCompressPlugin from "./plugin/compress.js";
import packageJson from "../package.json";

export default mergeConfig(
	{
		mode: "production",
		plugins: [configCompressPlugin("gzip"), configVisualizerPlugin(), configImageminPlugin()],
		build: {
			target: "es2015", // 输出es版本
			outDir: packageJson.name, // 输出目录
			assetsDir: "assets", // 指定生成静态资源的存放路径
			minify: "terser", // 混淆器，terser构建后文件体积更小
			terserOptions: {
				compress: {
					// 生产环境去除 console debugger
					drop_console: true,
					drop_debugger: true
				}
			},
			rollupOptions: {
				input: "./index.html", // 打包入口
				output: {
					// eslint-disable-next-line consistent-return
					manualChunks(id) {
						if (id.includes("node_modules")) {
							return id.toString().split("node_modules/")[1].split("/")[0].toString();
						}
					}
				}
			},
			chunkSizeWarningLimit: 2000
		}
	},
	baseConfig
);
