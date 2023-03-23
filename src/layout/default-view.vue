<template>
	<n-layout :has-sider="true">
		<n-layout-sider
			bordered
			v-if="renderMenu"
			v-show="!hideMenu"
			class="layout-sider"
			:icon-size="16"
			:inverted="inverted"
			:collapsed-width="appStore.menuCollapsedWidth"
			:collapsed="collapsed"
			:width="menuWidth"
			collapse-mode="width"
			:native-scrollbar="false"
			show-trigger="arrow-circle"
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
			:width="menuWidth"
			:closable="false"
			@after-leave="drawerCancel"
		>
			<n-layout-sider :inverted="inverted" class="layout-sider" :width="menuWidth">
				<Menu />
			</n-layout-sider>
		</n-drawer>
		<n-layout :style="paddingStyle">
			<div class="layout-content">
				<div v-if="navbar" class="layout-navbar">
					<NavBar />
				</div>
				<tab-bar v-if="appStore.tabBar" />
				<n-layout-content>
					<slot></slot>
				</n-layout-content>
				<Footer v-if="footer" />
			</div>
		</n-layout>
	</n-layout>
</template>

<script setup>
import { computed, provide, ref } from "vue";
import useAppStore from "@/store/modules/app";
import NavBar from "@/components/Navbar/index.vue";
import Menu from "@/components/Menu/index.vue";
import Footer from "@/components/footer/index.vue";
import TabBar from "@/components/TabBar/index.vue";
import useResponsive from "@/hooks/responsive";

defineOptions({ name: "DefaultView" });

const appStore = useAppStore();
useResponsive(true);
const navbarHeight = `48px`;
const inverted = computed(() => appStore.sideTheme === "dark");
const navbar = computed(() => appStore.navbar); // 是否开启头部标题栏
const renderMenu = computed(() => appStore.menu); // 是否渲染左侧菜单栏
const hideMenu = computed(() => appStore.hideMenu); // 是否隐藏左侧菜单栏
const collapsed = computed(() => appStore.menuCollapse); // 是否折叠菜单栏
const footer = computed(() => appStore.footer); // 是否显示底部

const menuWidth = computed(() => {
	return appStore.menuCollapse ? appStore.menuCollapsedWidth : appStore.menuWidth; // 菜单栏宽度
});

const paddingStyle = computed(() => {
	const paddingLeft = renderMenu.value && !hideMenu.value ? { paddingLeft: `${menuWidth.value}px` } : {};
	const paddingTop = navbar.value ? { paddingTop: navbarHeight } : {};
	return { ...paddingLeft, ...paddingTop };
});

// 菜单折叠展开
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

.layout-content {
	/* 设置父元素为flex布局 */
	display: flex;
	/* 设置子元素的排列方向 */
	flex-direction: column;
	/* 设置子元素在该方向上的对齐方式 */
	justify-content: space-between;
	min-height: calc(100vh - 50px);
	min-width: 100%;
}

.layout-navbar {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	width: 100%;
	height: @nav-size-height;
}

.layout-sider {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	height: 100%;
	transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);

	.menu-wrapper {
		padding-top: 45px;
		box-sizing: border-box;
	}

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
