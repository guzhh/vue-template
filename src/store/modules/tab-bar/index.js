import { defineStore } from "pinia";

const formatTag = route => {
	const { name, meta, fullPath, query } = route;
	return {
		title: meta.title || "",
		icon: meta.icon || "",
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
			// 判断进入的路由是否在白名单中
			if (BAN_LIST.includes(route.name)) return;
			// 格式化路由
			const formatRoute = formatTag(route);
			// 判断传递过来的路由之前有没有存储过
			if (this.tagList.some(tag => tag.fullPath === formatRoute.fullPath)) {
				// 如果存储过则进行替换
				this.tagList = this.tagList.map(tag => {
					if (tag.fullPath === formatRoute.fullPath) return formatRoute;
					return tag;
				});
			} else {
				// 否则直接放入
				this.tagList.push(formatTag(route));
			}
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
