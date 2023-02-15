import { spawn } from "child_process";
import { getEnv } from "../utils";

export const devServerPlugin = () => {
	return {
		name: "dev-server-plugin",
		// 当 Vite 为我们启动 Http 服务的时候，configureServer钩子会被执行。
		configureServer(server) {
			server.httpServer?.once("listening", () => {
				// const addressInfo = server.httpServer?.address();
				// eslint-disable-next-line global-require
				const koaServerProcess = spawn("node", ["./server/bin/www.js", getEnv("VITE_DEV_NODE_PROP")], {
					cwd: process.cwd(), // 设置当前的工作目录，process.cwd() 返回的值就是当前项目的根目录
					// 这里设置 inherit 可以让 electron 子进程的控制台输出数据同步到主进程的控制台。
					// 这样我们在主进程中 console.log 的内容就可以在 VSCode 的控制台上看到了。
					stdio: "inherit"
				});

				/**
				 * 当 electron 子进程退出的时候，我们要关闭 Vite 的 http 服务，并且控制父进程退出，准备下一次启动。
				 */
				koaServerProcess.on("close", () => {
					server.clone();
					process.exit();
				});
			});
		}
	};
};
