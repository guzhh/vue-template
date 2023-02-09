import request from "@/utils/request/request";

/**
 * 上传图片
 * @returns {Promise<*>}
 */
export function uploadImage(params) {
	return request.post({
		url: "/p/upload/image",
		data: params,
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});
}
