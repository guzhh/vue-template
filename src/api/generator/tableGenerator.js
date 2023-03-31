import nodeRequest from "@/utils/request/nodeRequest";

/**
 * 获取数据表所有字段
 * @returns {Promise<*>}
 */
export function getDataSheet(params) {
	return nodeRequest.get({
		url: "/generator/getDataSheet",
		params,
		customs: {
			isLoading: true
		}
	});
}

/**
 * 生成文件
 * @param params
 * @returns {Promise<*>}
 */
export function generateTable(params) {
	return nodeRequest.post({
		url: "/generator/generateTable",
		data: params,
		customs: {
			isLoading: true
		},
		responseType: "blob"
	});
}
