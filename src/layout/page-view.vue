<template>
	<div style="width: 100%">
		<router-view v-slot="{ Component, route }">
			<transition name="fade" mode="out-in" appear>
				<component :is="Component" v-if="route.meta.ignoreCache" :key="route.fullPath" />
				<keep-alive v-else :include="cacheList">
					<component :is="Component" :key="route.fullPath" />
				</keep-alive>
			</transition>
		</router-view>
	</div>
</template>

<script setup>
import { computed } from "vue";
import useTabBarStore from "@/store/modules/tab-bar";

defineOptions({ name: "pageView" });

const tabBarStore = useTabBarStore();
tabBarStore.addCache("pageView");

const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
	transition: all 0.3s ease-out;
}

.slide-enter-to {
	position: absolute;
	right: 0;
}

.slide-enter-from {
	position: absolute;
	right: -100%;
}

.slide-leave-to {
	position: absolute;
	left: -100%;
}

.slide-leave-from {
	position: absolute;
	left: 0;
}

.scale-slide-enter-active,
.scale-slide-leave-active {
	position: absolute;
	transition: all 0.5s ease;
}

.scale-slide-enter-from {
	left: -100%;
}

.scale-slide-enter-to {
	left: 0%;
}

.scale-slide-leave-from {
	transform: scale(1);
}

.scale-slide-leave-to {
	transform: scale(0.8);
}
</style>
