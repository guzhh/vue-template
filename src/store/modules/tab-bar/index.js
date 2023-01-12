import { defineStore } from "pinia";

const formatTag = route => {
	const { name, meta, fullPath, query } = route;
	return {
		title: meta.locale || "",
		name: String(name),
		fullPath,
		query,
		ignoreCache: meta.ignoreCache
	};
};

const BAN_LIST = ["404", "403", "notFound"];

const useTabBarStore = defineStore("tabBar", {
	state: () => ({
		cacheTabList: new Set([]),
		tagList: []
	}),
	getters: {
		getTabList() {
			return this.tagList;
		},
		getCacheList() {
			return Array.from(this.cacheTabList);
		}
	},
	actions: {
		updateTabList(route) {
			if (BAN_LIST.includes(route.name)) return;
			this.tagList.push(formatTag(route));
			if (!route.meta.ignoreCache) {
				this.cacheTabList.add(route.name);
			}
		},
		deleteTag(idx, tag) {
			this.tagList.splice(idx, 1);
			this.cacheTabList.delete(tag.name);
		},
		addCache(name) {
			if (typeof name === "string" && name !== "") this.cacheTabList.add(name);
		},
		deleteCache(tag) {
			this.cacheTabList.delete(tag.name);
		},
		freshTabList(tags) {
			this.tagList = tags;
			this.cacheTabList.clear();
			// 要先判断ignoreCache
			this.tagList
				.filter(el => !el.ignoreCache)
				.map(el => el.name)
				.forEach(x => this.cacheTabList.add(x));
		},
		resetTabList() {
			this.tagList = [];
			this.cacheTabList.clear();
			this.cacheTabList.add();
		}
	}
});

export default useTabBarStore;
