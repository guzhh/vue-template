import { mergeConfig } from "vite";
import { resolve } from "path";
import eslint from "vite-plugin-eslint";
import { viteMockServe } from "vite-plugin-mock";
import baseConfig from "./vite.config.base";
import { getEnv } from "./utils/index.js";

export default mergeConfig(
	{
		plugins: [
			eslint({
				cache: false,
				include: ["src/**/*.js", "src/**/*.jsx", "src/**/*.vue"],
				exclude: ["node_modules"]
			}),
			// mock 数据
			viteMockServe({
				supportTs: false, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
				logger: true, // 是否在控制台显示请求日志
				localEnabled: true, // 是否开启 mock
				mockPath: resolve(__dirname, "../src/mock") // mock文件地址
			})
		],
		server: {
			host: "0.0.0.0",
			port: 3000,
			open: false,
			https: false,
			fs: {
				strict: true
			},
			proxy: {
				[getEnv("VITE_API_BASE_URL")]: {
					target: `http://192.168.1.34:9100`, // 要使用 url 模块解析的 url 字符串
					changeOrigin: true, // 是否将发送请求头中host设置为target
					secure: false, // 是否验证SSL证书
					ws: true // 是否代理websocket
					// rewrite: (urlPath) => urlPath.replace(/^\/api/, `/`)
				},
				[getEnv("VITE_DEV_NODE_API")]: {
					target: `http://127.0.0.1:${getEnv("VITE_DEV_NODE_PROP")}`, // 要使用 url 模块解析的 url 字符串
					changeOrigin: true, // 是否将发送请求头中host设置为target
					secure: false, // 是否验证SSL证书
					ws: true // 是否代理websocket
					// rewrite: (urlPath) => urlPath.replace(/^\/api/, `/`)
				}
			}
		}
	},
	baseConfig
);
