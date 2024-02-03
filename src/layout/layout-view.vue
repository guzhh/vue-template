<template>
	<div style="width: 100%">
		<router-view v-slot="{ Component }">
			<keep-alive :include="cacheList">
				<component :is="Component" />
			</keep-alive>
		</router-view>
	</div>
</template>

<script setup>
import { computed } from "vue";
import useTabBarStore from "@/store/modules/tab-bar";

defineOptions({ name: "pageView" });

const tabBarStore = useTabBarStore();
tabBarStore.addCache("layoutView");

const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style scoped lang="less"></style>
