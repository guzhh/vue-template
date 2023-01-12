<template>
	<div>
		<div style="width: 100%; height: 50px"></div>
		<n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
			<template #icon>
				<error-icon style="width: 450px"></error-icon>
			</template>
			<template #footer>
				<n-button @click="goHome">返回首页</n-button>
			</template>
		</n-result>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import ErrorIcon from "@/assets/images/404-Error.svg";

defineOptions({ name: "404" });

const router = useRouter();
// eslint-disable-next-line no-unused-vars
const goHome = () => {
	router.push({ name: "home" });
};
</script>

<style scoped></style>
