#!/usr/bin/env node

/**
 * 模块依赖关系。
 */
const http = require("http");
const debug = require("debug")("demo:server");
const app = require("../app");

/**
 * 创建 HTTP 服务器。
 */

const server = http.createServer(app.callback());

/**
 * 将端口规范化为数字、字符串或 false。
 */

function normalizePort(val) {
	const port = parseInt(val, 10);

	// eslint-disable-next-line no-restricted-globals
	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * 从环境中获取端口并存储在 Express 中。
 */

const port = normalizePort(process.argv[2]);

/**
 * HTTP 服务器“错误”事件的事件侦听器。
 */

function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}

	const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(`${bind} requires elevated privileges`);
			//  process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(`${bind} is already in use`);
			//  process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * HTTP 服务器“侦听”事件的事件侦听器。
 */

function onListening() {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	debug(`正在监听 ${bind}`);
}

/**
 * 侦听所有网络接口上提供的端口。
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
