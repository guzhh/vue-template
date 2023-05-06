<template>
	<page-content>
		<n-card size="small" title="模态框">
			<n-button @click="handleClick"> 打开弹框</n-button>
			<test-button></test-button>
			<base-modal title="弹窗测试" v-model:show="appData.show">
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
				<h1>弹窗内容</h1>
			</base-modal>
		</n-card>
	</page-content>
</template>

<script setup>
defineOptions({ name: "modal" });

const appData = reactive({
	show: false
});

const handleClick = () => {
	appData.show = true;
};
</script>

<style scoped></style>
