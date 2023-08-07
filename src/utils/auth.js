const TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;

const isLogin = () => {
	return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
	return localStorage.getItem(TOKEN_KEY);
};

const setToken = token => {
	localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
	localStorage.removeItem(TOKEN_KEY);
};

/**
 * 设置缓存中存储的当前选中用户的所在机构
 */
const setStorageOrg = (userId, org) => {
	localStorage.setItem(`panku_org_user_${userId}`, btoa(encodeURI(JSON.stringify(org))));
};

/**
 * 获取缓存中存储的当前选中用户的所在机构
 * @param userId
 * @returns {any}
 */
const getStorageOrg = userId => {
	if (localStorage.getItem(`panku_org_user_${userId}`)) {
		return JSON.parse(decodeURI(atob(localStorage.getItem(`panku_org_user_${userId}`))));
	}
	return false;
};

export { isLogin, getToken, setToken, clearToken, getStorageOrg, setStorageOrg };
