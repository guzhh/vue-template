<template>
	<div class="logo" :style="collapsed ? { height: '60px' } : { height: '120px' }">
		<img
			:src="Logo"
			alt=""
			:title="SYSTEM_NAME"
			:style="collapsed ? { width: '36px', height: '36px' } : { width: '58px', height: '58px' }"
		/>
		<!--    :class="{ 'mr-2': !collapsed }"-->
		<h2 class="title" v-if="!collapsed">{{ SYSTEM_NAME }}</h2>
	</div>
</template>

<script setup>
import { computed } from "vue";
import useAppStore from "@/store/modules/app";
import Logo from "@/assets/images/logo.svg?url";

defineOptions({ name: "DarkLogo" });
const SYSTEM_NAME = import.meta.env.VITE_SYSTEM_NAME; // 系统标题

const appStore = useAppStore();
const collapsed = computed(() => appStore.menuCollapse); // 是否折叠菜单栏
</script>

<style scoped lang="less">
.logo {
	display: flex;
	overflow: hidden;
	white-space: nowrap;
	cursor: pointer;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	img {
		margin-top: 10px;
	}

	.title {
		margin-bottom: 0;
		font-size: 22px;
		letter-spacing: 1px;
		margin-top: 15px;
	}
}
</style>
