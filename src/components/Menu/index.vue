<template>
	<n-menu
		accordion
		:render-label="renderMenuLabel"
		:render-icon="renderMenuIcon"
		:collapsed="collapsed"
		:collapsed-width="menuCollapsedWidth"
		key-field="id"
		:indent="20"
		:inverted="inverted"
		:value="route.meta.id"
		:collapsed-icon-size="22"
		:options="menuTree"
	/>
</template>

<script setup>
import { computed, h } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { Icons } from "@/plugins/icons";
import useAppStore from "@/store/modules/app";
import { renderIcon } from "@/utils/render";

defineOptions({ name: "Menu" });

const route = useRoute();
const appStore = useAppStore();
const collapsed = computed({
	get() {
		if (appStore.device === "desktop") return appStore.menuCollapse;
		return false;
	},
	set(value) {
		appStore.updateSettings({ menuCollapse: value });
	}
});
const inverted = computed(() => appStore.sideTheme === "dark");
const menuTree = computed(() => appStore.appAsyncMenus);
const menuCollapsedWidth = computed(() => appStore.menuCollapsedWidth);

const renderMenuLabel = option => {
	if (option?.children && option?.children.length > 0) {
		return h("span", { title: option?.meta?.title }, option?.meta?.title);
	}
	if (option?.meta.linkType === 1) {
		return h("a", { href: option?.meta?.linkValue, target: "_blank", title: option?.meta?.title }, option?.meta?.title);
	}
	return h(
		RouterLink,
		{ to: { name: option.name, query: {} }, title: option?.meta?.title },
		{ default: () => option?.meta?.title }
	);
};

const renderMenuIcon = option => {
	if (option?.meta?.icon) {
		return renderIcon(Icons[option?.meta?.icon])();
	}
	return null;
};
</script>

<style scoped></style>
