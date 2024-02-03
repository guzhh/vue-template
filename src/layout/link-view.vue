<template>
	<n-spin :show="spinning">
		<iframe :src="linkValue" frameborder="0" scrolling="yes" allowtransparency="yes" id="ifra" class="reportIframe"></iframe>
	</n-spin>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import useUserStore from "@/store/modules/user";
import { useWindowSize } from "@/hooks/useWindowSize";

const { height } = useWindowSize();
defineOptions({
	name: "LinkView"
});

const iframeHeight = computed(() => {
	return `${height.value - 10}px`;
});

const route = useRoute();
const userStore = useUserStore();

const spinning = ref();
const linkValue = ref("");

const getLinkValue = value => {
	const linkUrl = decodeURIComponent(value);
	linkValue.value = linkUrl
		.replace(/\${account}/, userStore.userInfo.account)
		.replace(/\${name}/, userStore.userInfo.name)
		.replace(/\${departCode}/, userStore.userInfo.departCode)
		.replace(/\${departName}/, userStore.userInfo.departName);
};
getLinkValue(route.meta.linkValue);

watch(route, value => {
	spinning.value = true;
	getLinkValue(value.meta.linkValue);
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
	height: v-bind(iframeHeight);
	background-color: #ffffff;
}
</style>
