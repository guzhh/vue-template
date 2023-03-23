<template>
	<div class="container">
		<div class="main">
			<div class="left_box"></div>
			<div class="right_box">
				<login-form></login-form>
			</div>
		</div>
		<div class="footer">
			<span v-html="systemCopyright"></span>
		</div>
	</div>
</template>
<script setup>
import LoginForm from "./components/loginForm.vue";

const systemCopyright = import.meta.env.VITE_SYSTEM_COPYRIGHT;
</script>
<style scoped lang="less">
.container {
	width: 100%;
	height: 100vh;
	background-image: url("@/assets/images/login/bg.png");
	background-repeat: no-repeat;
	background-size: cover;
	overflow: auto;
	font-family: "PingFang SC";
	font-style: normal;
	display: flex;
	justify-content: center;
	align-items: center;

	.footer {
		position: absolute;
		right: 0;
		bottom: 20px;
		width: 100%;
		text-align: center;
		color: #2b2b2e;
		text-align: center;
		font-size: 14px;
		font-weight: 400;
		font-style: normal;
		line-height: 20px;
	}
	.main {
		border-radius: 8px;
		width: 1060px;
		height: 580px;
		//position: absolute;
		//top: 0;
		//left: 0;
		//right: 0;
		//bottom: 0;
		//margin: auto;

		//position: absolute;
		//transform: translate(-50%, -50%);
		//left: 50%;
		//top: 50%;
		display: flex;
		filter: drop-shadow(0px 0px 32px rgba(45, 83, 142, 0.08));

		.left_box {
			width: 600px;
			height: 100%;
			background-image: url("@/assets/images/login/master.png");
			background-repeat: no-repeat;
			background-size: cover;
		}
		.right_box {
			width: 460px;
			height: 100%;
			background-color: #ffffff;
		}
	}
}
</style>
