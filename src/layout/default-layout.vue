<template>
	<default-view>
		<router-view v-slot="{ Component }">
			<keep-alive :include="cacheList">
				<component :is="Component" />
			</keep-alive>
		</router-view>
	</default-view>
</template>

<script setup>
import { computed } from "vue";
import DefaultView from "./default-view.vue";
import useTabBarStore from "@/store/modules/tab-bar";

defineOptions({ name: "defaultLayout" });

const tabBarStore = useTabBarStore();

const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style scoped lang="less"></style>
