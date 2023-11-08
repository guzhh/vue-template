import request from "@/utils/request/request";

export function getPageList(params) {
	return request.post({
		url: "/p/versionRelease/getPageList",
		data: params,
		customs: {
			isLoading: true
		}
	});
}
export function saveOrUpt(params) {
	return request.post({
		url: "/p/versionRelease/saveOrUpt",
		data: params,
		customs: {
			isLoading: true
		}
	});
}
export function delVersion(params) {
	return request.post({
		url: "/p/versionRelease/del",
		data: params,
		customs: {
			isLoading: true
		}
	});
}
