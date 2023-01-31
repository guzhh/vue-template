<template>
	<div class="block">
		<h5 class="title">主题颜色</h5>
		<div class="drawer-setting-item align-items-top">
			<span
				@click="appTheme(item)"
				v-for="(item, index) in appThemeList"
				:key="index"
				class="theme-item"
				:style="{ 'background-color': item }"
			>
				<n-icon v-if="item === appStore.themeColor" size="12">
					<CheckOutlined />
				</n-icon>
			</span>
		</div>
		<n-color-picker v-model:value="appStore.themeColor" :show-alpha="false" :modes="['hex']" />
	</div>
</template>

<script setup>
import { CheckOutlined } from "@vicons/antd";
import { appThemeList } from "@/config/settings";
import { useAppStore } from "@/store";

const appStore = useAppStore();

const appTheme = color => {
	appStore.toggleThemeColor(color);
};
</script>

<style scoped lang="less">
.block {
	margin-bottom: 24px;
}

.title {
	margin: 10px 0;
	padding: 0;
	font-size: 14px;
}

.drawer-setting-item {
	display: flex;
	align-items: center;
	flex-wrap: wrap;

	.theme-item {
		width: 20px;
		min-width: 20px;
		height: 20px;
		cursor: pointer;
		border: 1px solid #eee;
		border-radius: 2px;
		margin: 0 5px 5px 0;
		text-align: center;

		.n-icon {
			color: #fff;
		}
	}
}
</style>
