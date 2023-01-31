<template>
	<n-spin :show="spinning">
		<iframe :src="linkValue" frameborder="0" scrolling="yes" allowtransparency="yes" id="ifra" class="reportIframe"></iframe>
	</n-spin>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

defineOptions({
	name: "LinkView"
});

const route = useRoute();

const spinning = ref();
const linkValue = ref(route.meta.linkValue);

watch(route, value => {
	spinning.value = true;
	linkValue.value = value.meta.linkValue;
});

onMounted(() => {
	nextTick(() => {
		const iframe = document.getElementById("ifra");
		if (iframe.attachEvent) {
			iframe.attachEvent("onload", () => {
				spinning.value = false;
			});
		} else {
			iframe.onload = () => {
				spinning.value = false;
			};
		}
	});
});
</script>

<style scoped>
.reportIframe {
	width: 100%;
	height: calc(100vh - 50px);
	background-color: #ffffff;
}
</style>
