import { loadEnv } from "vite";

/**
 * 是否生成打包报告
 */
export function isReportMode() {
	return process.env.REPORT === "true";
}

/**
 * 获取配置文件
 * @param mode
 */
const envResolve = mode => {
	return loadEnv(mode, process.cwd());
};

/**
 * 或者指定环境变量
 * @param env
 */
export const getEnv = env => {
	return envResolve(process.argv[process.argv.length - 1])[env];
};
