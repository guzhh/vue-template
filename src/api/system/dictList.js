import request from "@/utils/request/request";

/**
 * 获取字典列表
 * @returns {Promise<*>}
 */
export function getDictList(params) {
	return request.post({
		url: "/p/auth/auth-dict/getDictList",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "字典列表获取中..."
		}
	});
}

/**
 * 保存或新增字典信息
 * @returns {Promise<*>}
 */
export function saveOrUptDict(params) {
	return request.post({
		url: "/p/auth/auth-dict/saveOrUptDict",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "字典保存中..."
		}
	});
}

/**
 * 删除字典信息
 * @returns {Promise<*>}
 */
export function delDict(params) {
	return request.post({
		url: "/p/auth/auth-dict/delDict",
		data: params,
		customs: {
			isLoading: true,
			loadingText: "字典删除中..."
		}
	});
}

/**
 * 根据父ids获取下级字典集合
 * @returns {Promise<*>}
 */
export function getDictByPids(params) {
	return request.post({
		url: "/p/auth/auth-dict/getDictByPids",
		data: params
	});
}

/**
 * 根据父级字典编码获取下级字典集合
 * @param params
 * @returns {Promise<*>}
 */
export function getDictByPCodes(params) {
	return request.post({
		url: "/p/auth/auth-dict/getDictByPcodes",
		data: params
	});
}

/**
 * 根据code获取字典对象
 * @param params
 * @returns {Promise<*>}
 */
export function getDict(params) {
	return request.post({
		url: "/p/auth/auth-dict/getDictByCode",
		data: params
	});
}
