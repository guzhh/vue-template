<template>
	<div>
		<div style="width: 100%; height: 50px"></div>
		<n-result status="403" title="403 禁止访问" description="总有些门是对你关闭的">
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
import ErrorIcon from "@/assets/images/403-Error.svg";

defineOptions({ name: "403" });

const router = useRouter();
// eslint-disable-next-line no-unused-vars
const goHome = () => {
	router.push("/");
};
</script>

<style scoped></style>
