<template>
	<div class="tab-bar-container">
		<n-affix :top="120" :trigger-top="offsetTop" :listen-to="() => containerRef">
			<n-tag>顶部触发距离 60px</n-tag>
		</n-affix>
	</div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useAppStore } from "@/store";

const appStore = useAppStore();
// eslint-disable-next-line no-void
const containerRef = ref(void 0);
const offsetTop = computed(() => {
	return appStore.navbar ? 48 : 0;
});
</script>

<style scoped lang="less">
.tab-bar-container {
	position: relative;
	background-color: var(--color-bg-2);
}
</style>
