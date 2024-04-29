<template>
	<n-layout-footer class="footer">
		<span v-html="systemCopyright"></span>
		<span v-if="ifTemp" style="position: fixed; right: 30px; color: #898c8c; font-size: 14px">此系统为试用版本</span>
	</n-layout-footer>
</template>

<script setup>
// 全局公共变量
import { useThemeVars } from "naive-ui";
import { info } from "@/api/system/licence";

defineOptions({ name: "Footer" });

const systemCopyright = import.meta.env.VITE_SYSTEM_COPYRIGHT;

const themeVars = useThemeVars();
const ifTemp = ref(false); // 是否体验版本

// 获取许可证类型
info({}).then(res => {
	ifTemp.value = false;
	if (res.success && res.result?.licenseType) {
		ifTemp.value = ["temp"].includes(res.result.licenseType);
	}
});
</script>

<style lang="less">
.footer {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	color: v-bind("themeVars.textColor3");
	text-align: center;
	position: relative;
	//background-color: v-bind("themeVars.badyColor");
	//margin-top: 10px;
}
</style>
