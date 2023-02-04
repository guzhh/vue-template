<template>
	<div class="block">
		<h5 class="title">侧边栏样式</h5>
		<n-grid>
			<n-grid-item v-for="(item, index) of sideExampleList" :key="index" :span="8" class="example-wrapper">
				<StyleExample
					:checked="sideTheme === item.themeId"
					:left-bg="item.leftBg"
					:right-top-bg="item.rightTopBg"
					:right-bottom-bg="item.rightBottomBg"
					@click="exampleClick(item)"
				/>
			</n-grid-item>
		</n-grid>
	</div>
</template>

<script setup>
import { computed, reactive } from "vue";
import StyleExample from "@/components/StyleExample/index.vue";
import { useAppStore } from "@/store";

const appStore = useAppStore();

const sideTheme = computed(() => appStore.sideTheme);

const sideExampleList = reactive([
	{
		leftBg: "#000000",
		rightTopBg: "#ffffff",
		rightBottomBg: "#f5f5f5",
		themeId: "dark"
	},
	{
		leftBg: "#ffffff",
		rightTopBg: "#ffffff",
		rightBottomBg: "#f5f5f5",
		themeId: "white"
	}
]);

const exampleClick = item => {
	appStore.toggleSideTheme(item.themeId);
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
</style>
