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
		<n-button block size="small" @click="moreTopics">更多主题色</n-button>
		<n-modal
			style="width: 640px"
			:z-index="99999"
			v-model:show="showColorModal"
			class="custom-card"
			preset="card"
			title="中国传统色"
			size="small"
			content-style="padding: 0;"
			:bordered="true"
		>
			<n-tabs type="line" size="small" :tabs-padding="20" pane-style="padding: 20px;">
				<n-tab-pane :name="item.label" v-for="item in colors" :key="item.label">
					<div class="color-tab">
						<div class="color-bab-item" :key="color.color" v-for="color in item.data" @click="appTheme(color.color)">
							<div class="color-box" :style="{ backgroundColor: color.color }">
								<n-icon v-if="color.color === appStore.themeColor" size="18">
									<CheckOutlined />
								</n-icon>
							</div>
							<span style="margin-top: 5px">{{ color.label }}</span>
						</div>
					</div>
				</n-tab-pane>
			</n-tabs>
		</n-modal>
	</div>
</template>

<script setup>
import { CheckOutlined } from "@vicons/antd";
import { ref } from "vue";
import { appThemeList } from "@/config/settings";
import useAppStore from "@/store/modules/app";
import colors from "@/config/color.json";

const appStore = useAppStore();
const showColorModal = ref(false);

const appTheme = color => {
	appStore.toggleThemeColor(color);
};

const moreTopics = () => {
	showColorModal.value = true;
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

.color-tab {
	width: 100%;
	display: flex;
	justify-content: left;
	flex-wrap: wrap;

	.color-bab-item {
		margin: 0 5px 10px 5px;
		display: flex;
		align-items: center;
		flex-direction: column;

		.color-box {
			width: 64px;
			height: 40px;
			box-sizing: border-box;
			border-radius: 5px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #ffffff;
		}
	}
}
</style>
