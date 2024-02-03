<template>
	<div class="content">
		<slot></slot>
	</div>
</template>

<script setup>
import { useThemeVars } from "naive-ui";
import { useWindowSize } from "@/hooks/useWindowSize";

defineOptions({ name: "ContentContainer" });

const themeVars = useThemeVars();
const { height } = useWindowSize();
const ht = computed(() => `${height.value}px`);
</script>

<style scoped lang="less">
.content {
	box-sizing: border-box;
	width: 100%;
	padding: 8px;
	height: v-bind(ht);
	background-color: v-bind("themeVars.cardColor");
	background-clip: content-box;
	border: 1px solid var(--n-border-color);
	border-radius: 16px;
	display: flex;
	flex-direction: column;
}
</style>
