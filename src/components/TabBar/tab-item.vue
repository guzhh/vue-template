<template>
	<n-dropdown
		@clickoutside="showDropdown = false"
		:show="showDropdown"
		trigger="manual"
		:options="options"
		@select="handleSelect"
	>
		<chrome-tab
			:dark-mode="theme === 'dark'"
			:primary-color="themeVars.primaryColor"
			@contextmenu="handleContextMenu"
			@click="goto(itemData)"
			@close="tagClose(itemData, index)"
			:is-active="itemData.fullPath === $route.fullPath"
		>
			<div style="display: flex; align-items: center">
				<component :is="itemData.icon" style="width: 16px; height: 16px" />
				<div style="padding-top: 3px">
					<span style="margin-left: 8px">{{ itemData.title }}</span>
				</div>
			</div>
		</chrome-tab>
	</n-dropdown>
</template>

<script setup>
import { ref, computed } from "vue";
import { Refresh, CloseOutline } from "@vicons/ionicons5";
import { ArrowRightOutlined, ArrowLeftOutlined, SwapOutlined } from "@vicons/antd";
import { useRouter, useRoute } from "vue-router";
import { useMessage, useThemeVars } from "naive-ui";
import { ChromeTab } from "@soybeanjs/vue-admin-tab";
import { renderIcon } from "@/utils/render";
import useAppStore from "@/store/modules/app";
import useTabBarStore from "@/store/modules/tab-bar";
import { REDIRECT_ROUTE_NAME } from "@/router/constants";

const props = defineProps({
	itemData: {
		type: Object,
		default() {
			return [];
		}
	},
	index: {
		type: Number,
		default: 0
	}
});

const appStore = useAppStore();

const theme = computed(() => {
	return appStore.theme;
});

const message = useMessage();
const router = useRouter();
const route = useRoute();
const tabBarStore = useTabBarStore();
const showDropdown = ref(false);
const options = ref([
	{
		label: "重载当前标签页",
		key: "reload",
		icon: renderIcon(Refresh)
	},
	{ label: "关闭当前标签页", key: "current", icon: renderIcon(CloseOutline) },
	{ label: "关闭左侧标签页", key: "left", icon: renderIcon(ArrowLeftOutlined) },
	{ label: "关闭右侧标签页", key: "right", icon: renderIcon(ArrowRightOutlined) },
	{ label: "关闭其它标签页", key: "others", icon: renderIcon(SwapOutlined) }
]);
// 获取到全部标签
const tagList = computed(() => {
	return tabBarStore.getTabList;
});

// 打开下拉菜单
const handleContextMenu = e => {
	e.preventDefault();
	showDropdown.value = true;
};
// 点击跳转标签页
const goto = tag => {
	router.push({ ...tag });
};

// 关闭当前标签
const tagClose = (tag, idx) => {
	if (props.itemData.fullPath === route.fullPath) {
		if (tagList.value.length === 1) {
			message.warning("当前标签页不可关闭");
		} else {
			let latest = { name: "home" };
			if (idx === 0) {
				latest = tagList.value[idx + 1]; // 获取队列的前一个tab
			} else {
				latest = tagList.value[idx - 1]; // 获取队列的前一个tab
			}
			tabBarStore.deleteTag(idx, tag);
			router.push({ ...latest });
		}
	} else {
		tabBarStore.deleteTag(idx, tag);
	}
};

// 获取当前选中路由索引
const findCurrentRouteIndex = () => {
	return tagList.value.findIndex(el => el.fullPath === route.fullPath);
};

// 选择下拉菜单
const handleSelect = async key => {
	showDropdown.value = false;
	const { itemData, index } = props;
	const copyTagList = [...tagList.value];
	if (key === "reload") {
		tabBarStore.deleteCache(itemData); // 将删除路由缓存
		await router.push({
			name: REDIRECT_ROUTE_NAME,
			params: {
				path: route.fullPath
			}
		});
		if (!itemData.ignoreCache) {
			tabBarStore.addCache(itemData.name); // 再次放入
		}
	} else if (key === "current") {
		tagClose(itemData, index);
	} else if (key === "left") {
		const currentRouteIdx = findCurrentRouteIndex();
		copyTagList.splice(0, props.index);
		tabBarStore.freshTabList(copyTagList);
		if (currentRouteIdx < index) {
			router.push({ name: itemData.name });
		}
	} else if (key === "right") {
		const currentRouteIdx = findCurrentRouteIndex();
		copyTagList.splice(props.index + 1);

		tabBarStore.freshTabList(copyTagList);
		if (currentRouteIdx > index) {
			router.push({ name: itemData.name });
		}
	} else if (key === "others") {
		const filterList = tagList.value.filter((el, idx) => {
			return idx === props.index;
		});
		tabBarStore.freshTabList(filterList);
		router.push({ name: itemData.name });
	}
};

// 全局公共CSS变量
const themeVars = useThemeVars();
</script>

<style scoped></style>
