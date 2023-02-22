<template>
	<div class="container">
		<div class="logo" style="display: none">
			<img alt="logo" :src="pkLogo" />
			<div class="logo-text">{{ title }}</div>
		</div>
		<LoginBanner></LoginBanner>
		<div class="content">
			<div class="content">
				<div class="content-inner">
					<LoginForm />
				</div>
				<div class="footer">
					<Footer />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useThemeVars } from "naive-ui";
import Footer from "@/components/footer/index.vue";
import LoginBanner from "./components/banner.vue";
import LoginForm from "./components/login-form.vue";
import pkLogo from "@/assets/images/pk-logo.png";

defineOptions({ name: "login" });

const title = import.meta.env.VITE_SYSTEM_NAME;

// 全局公共变量
// eslint-disable-next-line no-unused-vars
const themeVars = useThemeVars();
</script>

<style scoped lang="less">
.container {
	display: flex;
	height: 100vh;

	overflow: auto;
	background-image: url("@/assets/images/bg.png");
	background-repeat: no-repeat;
	background-size: cover;

	.banner {
		width: 550px;
		background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
	}

	.content {
		position: relative;
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		//padding-bottom: 40px;
		height: 100%;
	}

	.footer {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 100%;
	}
}

.logo {
	position: fixed;
	top: 24px;
	left: 22px;
	z-index: 1;
	display: inline-flex;
	align-items: center;

	img {
		width: 28px;
		height: 28px;
	}

	&-text {
		margin-right: 4px;
		margin-left: 4px;
		//color: v-bind("themeVars.baseColor");
		color: #f7f8fa;
		font-size: 18px;
	}
}
</style>
