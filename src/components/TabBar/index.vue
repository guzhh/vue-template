<template>
	<n-affix :trigger-top="offsetTop" style="z-index: 5">
		<div class="tab-bar-container">
			<div class="tab-bar-box">
				<div class="tab-bar-scroll">
					<div class="tags-wrap">
						<n-scrollbar x-scrollable>
							<tab-item v-for="(tag, index) in tagList" :key="tag.fullPath" :index="index" :item-data="tag" />
						</n-scrollbar>
					</div>
				</div>
			</div>
		</div>
	</n-affix>
</template>

<script setup>
import { computed, onUnmounted } from "vue";
import { useThemeVars } from "naive-ui";
import { useAppStore, useTabBarStore } from "@/store";
import { listenerRouteChange, removeRouteListener } from "@/utils/route-listener";
import TabItem from "./tab-item.vue";

const appStore = useAppStore();
const tabBarStore = useTabBarStore();
const tagList = computed(() => {
	return tabBarStore.getTabList;
});
const offsetTop = computed(() => {
	return appStore.navbar ? 47.5 : -0.5;
});

const menuWidth = computed(() => {
	return appStore.menuCollapse ? appStore.menuCollapsedWidth : appStore.menuWidth; // 菜单栏宽度
});
const renderMenu = computed(() => appStore.menu); // 是否渲染左侧菜单栏
const hideMenu = computed(() => appStore.hideMenu); // 是否隐藏左侧菜单栏
const tabWidth = computed(() => (renderMenu.value && !hideMenu.value ? `calc(100vw - ${menuWidth.value}px)` : "100vw"));

// 监听路由变化
listenerRouteChange(route => {
	if (!route.meta.noAffix && !tagList.value.some(tag => tag.fullPath === route.fullPath)) {
		tabBarStore.updateTabList(route);
	}
}, true);

onUnmounted(() => {
	removeRouteListener();
});

// 全局公共CSS变量
const themeVars = useThemeVars();
</script>

<style scoped lang="less">
.tab-bar-container {
	position: relative;
	background-color: v-bind("themeVars.cardColor");
	width: v-bind(tabWidth);

	.tab-bar-box {
		display: flex;
		padding: 0 10px;
		box-sizing: border-box;
		//background-color: v-bind("themeVars.bodyColor");
		border-bottom: 1px solid v-bind("themeVars.borderColor");

		.tab-bar-scroll {
			height: 38px;
			width: 100%;
			overflow: hidden;

			.tags-wrap {
				padding: 4px 0;
				height: 48px;
				white-space: nowrap;
				overflow-x: auto;

				:deep(.n-tag) {
					display: inline-flex;
					align-items: center;
					margin-right: 6px;
					cursor: pointer;
					&:first-child {
						.arco-tag-close-btn {
							display: none;
						}
					}
				}
			}
		}
	}
}
</style>
