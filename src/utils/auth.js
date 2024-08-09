const TOKEN_KEY = `${import.meta.env.BASE_URL}_${import.meta.env.VITE_ACCESS_TOKEN_KEY}`;
const VITE_RE_LOGIN = import.meta.env.VITE_RE_LOGIN === "true";

const isLogin = () => {
	if (VITE_RE_LOGIN) {
		return !!sessionStorage.getItem(TOKEN_KEY);
	}
	return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
	if (VITE_RE_LOGIN) {
		return sessionStorage.getItem(TOKEN_KEY);
	}
	return localStorage.getItem(TOKEN_KEY);
};

const setToken = token => {
	if (VITE_RE_LOGIN) {
		sessionStorage.setItem(TOKEN_KEY, token);
	}
	localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
	sessionStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(TOKEN_KEY);
};

/**
 * 设置缓存中存储的当前选中用户的所在机构
 */
const setStorageOrg = (userId, org) => {
	if (VITE_RE_LOGIN) {
		sessionStorage.setItem(`${import.meta.env.BASE_URL}_panku_org_user_${userId}`, btoa(encodeURI(JSON.stringify(org))));
	}
	localStorage.setItem(`${import.meta.env.BASE_URL}_panku_org_user_${userId}`, btoa(encodeURI(JSON.stringify(org))));
};

/**
 * 获取缓存中存储的当前选中用户的所在机构
 * @param userId
 * @returns {any}
 */
const getStorageOrg = userId => {
	let orgUser = null;
	if (VITE_RE_LOGIN) {
		orgUser = sessionStorage.getItem(`${import.meta.env.BASE_URL}_panku_org_user_${userId}`);
	} else {
		orgUser = localStorage.getItem(`${import.meta.env.BASE_URL}_panku_org_user_${userId}`);
	}
	if (orgUser) {
		return JSON.parse(decodeURI(atob(orgUser)));
	}
	return false;
};

export { isLogin, getToken, setToken, clearToken, getStorageOrg, setStorageOrg };
