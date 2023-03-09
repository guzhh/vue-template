<template>
	<page-content>
		<n-card size="small" title="富文本编辑器">
			<template #header-extra>
				<n-button size="small" type="primary" @click="viewTheContent">查看内容</n-button>
			</template>
			<wang-editor v-model:value="htmlVal" :height="height - 120" />
		</n-card>
	</page-content>
</template>

<script setup>
import { ref } from "vue";
import { useWindowSize } from "@/hooks/useWindowSize";

const { height } = useWindowSize();
const htmlVal = ref("<p></p>");

const viewTheContent = () => {
	// eslint-disable-next-line no-alert
	window.alert(htmlVal.value);
};
</script>

<style scoped></style>
