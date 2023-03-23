<template>
	<div class="first-loading-wrp">
		<div class="loading-wrp">
			<span class="line"></span>
			<span class="line"></span>
			<span class="line"></span>
			<span class="line"></span>
			<span class="line"></span>
			<span class="line"></span>
			<span class="line"></span>
			<span class="line"></span>
		</div>
		<div class="title">{{ msg }}</div>
	</div>
</template>

<script setup>
defineProps({
	msg: {
		type: String,
		default: "加载中..."
	}
});
</script>

<style scoped>
.first-loading-wrp {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 100vh;
	z-index: 2147483647;
	background-color: rgba(0, 0, 0, 0.1);
}
.loading-wrp {
	display: flex;
}
.line {
	width: 5px;
	height: 50px;
	margin: 0 5px;
	border-radius: 30px;
}
.loading-wrp > span:nth-child(even) {
	background-color: #2878fc;
	animation: growAnim 0.4s linear infinite alternate-reverse;
}

.loading-wrp > span:nth-child(odd) {
	background-color: #0051d4;
	animation: growAnimReverse 0.4s linear infinite alternate-reverse;
}

@keyframes growAnim {
	0% {
		transform: scale(1, 0.3);
		transform: scale(1, 0.3);
		transform: scale(1, 0.3);
		transform: scale(1, 0.3);
		transform: scale(1, 0.3);
	}
	100% {
		transform: scale(1, 1);
		transform: scale(1, 1);
		transform: scale(1, 1);
		transform: scale(1, 1);
		transform: scale(1, 1);
	}
}

@keyframes growAnimReverse {
	from {
		transform: scale(1, 1);
		transform: scale(1, 1);
		transform: scale(1, 1);
		transform: scale(1, 1);
		transform: scale(1, 1);
	}
	to {
		transform: scale(1, 0.3);
		transform: scale(1, 0.3);
		transform: scale(1, 0.3);
		transform: scale(1, 0.3);
		transform: scale(1, 0.3);
	}
}
.first-loading-wrp .title {
	margin-top: 30px;
	font-family: "楷体";
	font-size: 16px;

	/* font-weight: bold; */
	text-align: center;
}
</style>
