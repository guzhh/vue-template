<template>
	<n-menu
		:render-label="renderMenuLabel"
		:render-icon="renderMenuIcon"
		:collapsed="collapsed"
		:collapsed-width="50"
		key-field="name"
		:value="route.name"
		:collapsed-icon-size="22"
		:options="menuTree"
	/>
</template>

<script setup>
import { computed, h } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { Icons } from "@/plugins/icons";
import { useAppStore } from "@/store";
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
const menuTree = computed(() => appStore.appAsyncMenus);

const renderMenuLabel = option => {
	if (option?.meta.linkType === 1) {
		return h("a", { href: option?.meta?.linkValue, target: "_blank" }, option?.meta?.title);
	}
	return h(RouterLink, { to: { name: option.name, query: {} } }, { default: () => option?.meta?.title });
};

const renderMenuIcon = option => {
	if (option?.meta?.icon) {
		return renderIcon(Icons[option?.meta?.icon])();
	}
	return null;
};
</script>

<style scoped></style>
