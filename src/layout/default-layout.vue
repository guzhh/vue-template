<template>
	<n-layout class="layout" :class="{ mobile: appStore.hideMenu }">
		<div v-if="navbar" class="layout-navbar">
			<NavBar />
		</div>
		<n-layout>
			<n-layout :has-sider="true">
				<n-layout-sider
					bordered
					v-if="renderMenu"
					v-show="!hideMenu"
					class="layout-sider"
					:icon-size="16"
					:collapsed-width="64"
					:collapsed="collapsed"
					:width="menuWidth"
					collapse-mode="width"
					:native-scrollbar="false"
					show-trigger="arrow-circle"
					:style="{ marginTop: navbar ? '48px' : '' }"
					@update:collapsed="setCollapsed"
				>
					<div class="menu-wrapper">
						<Menu />
					</div>
				</n-layout-sider>
				<n-drawer
					v-if="hideMenu"
					v-model:show="drawerVisible"
					placement="left"
					mask-closable
					:closable="false"
					@after-leave="drawerCancel"
				>
					<Menu />
				</n-drawer>
				<n-layout class="layout-content" :style="paddingStyle">
					<tab-bar v-if="appStore.tabBar" />
					<n-layout-content>
						<PageLayout />
					</n-layout-content>
					<Footer v-if="footer" />
				</n-layout>
			</n-layout>
		</n-layout>
	</n-layout>
</template>

<script setup>
import { computed, provide, ref } from "vue";
import { useThemeVars } from "naive-ui";
import { useAppStore } from "@/store";
import NavBar from "@/components/Navbar/index.vue";
import Menu from "@/components/Menu/index.vue";
import Footer from "@/components/footer/index.vue";
import PageLayout from "./page-layout.vue";
import TabBar from "@/components/TabBar/index.vue";
import useResponsive from "@/hooks/responsive";

defineOptions({ name: "DefaultLayout" });

const appStore = useAppStore();
useResponsive(true);
const navbarHeight = `48px`;
const navbar = computed(() => appStore.navbar); // 是否开启头部标题栏
const renderMenu = computed(() => appStore.menu); // 是否渲染左侧菜单栏
const hideMenu = computed(() => appStore.hideMenu); // 是否隐藏左侧菜单栏
const collapsed = computed(() => appStore.menuCollapse); // 是否折叠菜单栏
const footer = computed(() => appStore.footer); // 是否显示底部

const themeVars = useThemeVars(); // 全局公共CSS变量
const menuWidth = computed(() => {
	return appStore.menuCollapse ? 48 : appStore.menuWidth; // 菜单栏宽度
});

const paddingStyle = computed(() => {
	const paddingLeft = renderMenu.value && !hideMenu.value ? { paddingLeft: `${menuWidth.value}px` } : {};
	const paddingTop = navbar.value ? { paddingTop: navbarHeight } : {};
	return { ...paddingLeft, ...paddingTop, backgroundColor: themeVars.value.actionColor, minHeight: "100vh" };
});

const setCollapsed = val => {
	appStore.updateSettings({ menuCollapse: val });
};

const drawerVisible = ref(false);
const drawerCancel = () => {
	drawerVisible.value = false;
};

provide("toggleDrawerMenu", () => {
	drawerVisible.value = !drawerVisible.value;
});
</script>

<style scoped lang="less">
@nav-size-height: 48px;
@layout-max-width: 1100px;

.layout {
	width: 100%;
	height: 100%;
}

.layout-navbar {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	width: 100%;
	height: @nav-size-height;
	background-color: v-bind("themeVars.bodyColor");
}

.layout-sider {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	height: 100%;
	transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);

	&::after {
		position: absolute;
		top: 0;
		right: -1px;
		display: block;
		width: 1px;
		height: 100%;
		background-color: var(--color-border);
		content: "";
	}

	> :deep(.arco-layout-sider-children) {
		overflow-y: hidden;
	}
}
</style>
