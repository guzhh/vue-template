<template>
	<div class="logo" @click="$router.push('/')">
		<img src="~@/assets/images/pk-logo.png" alt="" :title="SYSTEM_NAME" :class="{ 'mr-2': !collapsed }" v-if="collapsed" />
		<h2 class="title" v-else>{{ SYSTEM_NAME }}</h2>
	</div>
</template>

<script setup>
import { useThemeVars } from "naive-ui";

defineProps({
	collapsed: {
		type: Boolean
	}
});

const themeVars = useThemeVars(); // 全局公共CSS变量
const SYSTEM_NAME = import.meta.env.VITE_SYSTEM_NAME; // 系统标题
</script>

<style lang="less" scoped>
.logo {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 48px;
	line-height: 48px;
	overflow: hidden;
	white-space: nowrap;
	border-bottom: 1px solid v-bind("themeVars.borderColor");
	cursor: pointer;
	//background-color: #515a6e;

	img {
		width: auto;
		height: 32px;
	}

	.title {
		margin: 0;
		padding: 0;
		font-size: 25px;
		letter-spacing: 1px;
		//font-family: blazed;
		font-family: 楷体;
	}
}
</style>
