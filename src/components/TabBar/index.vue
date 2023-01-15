<template>
	<div class="tab-bar-container" ref="affixRef">
		<div class="tab-bar-box">
			<div class="tab-bar-scroll">
				<div class="tags-wrap">
					<tab-item v-for="(tag, index) in tagList" :key="tag.fullPath" :index="index" :item-data="tag" />
				</div>
			</div>
			<div class="tag-bar-operation"></div>
		</div>
	</div>
</template>

<script setup>
import { computed, onUnmounted, ref } from "vue";
import { useThemeVars } from "naive-ui";
import { useAppStore, useTabBarStore } from "@/store";
import { listenerRouteChange, removeRouteListener } from "@/utils/route-listener";
import TabItem from "./tab-item.vue";

const affixRef = ref();
const appStore = useAppStore();
const tabBarStore = useTabBarStore();
const tagList = computed(() => {
	return tabBarStore.getTabList;
});
// eslint-disable-next-line no-unused-vars
const offsetTop = computed(() => {
	return appStore.navbar ? 48 : 0;
});

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
	.tab-bar-box {
		display: flex;
		padding: 0 0 0 20px;
		//background-color: v-bind("themeVars.bodyColor");
		border-bottom: 1px solid v-bind("themeVars.borderColor");
		.tab-bar-scroll {
			height: 32px;
			flex: 1;
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
	.tag-bar-operation {
		width: 100px;
		height: 32px;
	}
}
</style>
