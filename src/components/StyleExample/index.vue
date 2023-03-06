<template>
	<div class="style-example-container" :class="{ 'circle-tip': checked }">
		<div class="left" :style="{ background: leftBg, backgroundSize: 'cover' }"></div>
		<div class="right">
			<div class="right-top" :style="{ backgroundColor: rightTopBg }"></div>
			<div class="right-bottom" :style="{ backgroundColor: rightBottomBg }"></div>
		</div>
		<div v-if="tipText" style="font-size: 12px; text-align: center">{{ tipText }}</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	name: "StyleExample",
	props: {
		leftBg: {
			type: String,
			default: "#000000"
		},
		rightTopBg: {
			type: String,
			default: "#ff0000"
		},
		rightBottomBg: {
			type: String,
			default: "#f5f5f5"
		},
		checked: {
			type: Boolean,
			default: false
		},
		tipText: {
			type: String,
			default: null
		}
	}
});
</script>

<style lang="scss" scoped>
$border-radius: 4px;
.style-example-container {
	width: 50px;
	height: 40px;
	margin: 0 auto;
	background-color: transparent;
	border-radius: $border-radius;
	box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
	.left {
		display: inline-block;
		width: 30%;
		height: 100%;
		border-top-left-radius: $border-radius;
		border-bottom-left-radius: $border-radius;
	}
	.right {
		display: inline-block;
		width: 70%;
		height: 100%;
		border-top-right-radius: $border-radius;
		border-bottom-right-radius: $border-radius;
		.right-top {
			height: 20%;
			border-top-right-radius: $border-radius;
		}
		.right-bottom {
			height: 80%;
			border-bottom-right-radius: $border-radius;
		}
	}
}
.circle-tip::after {
	display: block;
	width: 8px;
	height: 8px;
	margin: 0 auto;
	margin-top: 5px;
	text-align: center;
	content: "";
	background-color: rgb(3 190 50);
	border-radius: 50%;
}
.extra-class {
	.right {
		width: 100%;
		.right-top {
			border-top-left-radius: $border-radius;
			border-top-right-radius: $border-radius;
		}
		.right-bottom {
			border-bottom-right-radius: $border-radius;
			border-bottom-left-radius: $border-radius;
		}
	}
	.left {
		width: 0;
	}
}
.extra-class-1 {
	.left {
		width: 30%;
	}
	.left::after {
		position: relative;
		top: 0;
		left: 5px;
		display: inline-block;
		width: 10px;
		height: 100%;
		content: "";
		background-color: #828282;
	}
}
</style>
