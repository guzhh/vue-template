<template>
	<n-layout-footer class="footer">
		<span v-html="systemCopyright"></span>
	</n-layout-footer>
</template>

<script setup>
// 全局公共变量
import { useThemeVars } from "naive-ui";

defineOptions({ name: "Footer" });

const systemCopyright = import.meta.env.VITE_SYSTEM_COPYRIGHT;

const themeVars = useThemeVars();
</script>

<style lang="less">
.footer {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	color: v-bind("themeVars.textColor3");
	text-align: center;
	//background-color: v-bind("themeVars.badyColor");
	//margin-top: 10px;
}
</style>
