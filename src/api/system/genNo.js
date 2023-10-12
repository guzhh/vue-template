import request from "@/utils/request/request";

/**
 * 保存或修改
 * @returns {Promise<*>}
 */
export function saveOrUpt(params) {
	return request.post({
		url: "/p/genNo/saveOrUpt",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "保存或修改编码信息中..."
		}
	});
}

/**
 * 分页列表
 * @returns {Promise<*>}
 */
export function getPageList(params) {
	return request.post({
		url: "/p/genNo/getPageList",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "获取编码信息列表中..."
		}
	});
}

/**
 * 根据code删除
 * @returns {Promise<*>}
 */
export function delGenNo(params) {
	return request.post({
		url: "/p/genNo/del",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "删除编码信息中..."
		}
	});
}

/**
 * 根据code获取
 * @returns {Promise<*>}
 */
export function getByCode(params) {
	return request.post({
		url: "/p/genNo/getByCode",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "根据编码信息中..."
		}
	});
}
