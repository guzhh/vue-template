<template>
	<div class="n-icon">
		<n-tooltip>
			<span>搜索</span>
			<template #trigger>
				<n-icon :size="size" @click="handleActive">
					<Search />
				</n-icon>
			</template>
		</n-tooltip>
		<n-drawer
			v-model:show="active"
			:block-scroll="false"
			:placement="placement"
			:to="to"
			:trap-focus="false"
			:width="placement === 'left' || placement === 'right' ? width : undefined"
		>
			<n-drawer-content>
				<slot></slot>
				<template #footer>
					<n-space>
						<n-button size="small" type="primary" @click="search">查询</n-button>
						<n-button size="small" @click="reset">重置</n-button>
						<n-button size="small" @click="active = false">关闭</n-button>
					</n-space>
				</template>
			</n-drawer-content>
		</n-drawer>
	</div>
</template>

<script setup>
import { ref } from "vue";

const active = ref(false);
const emits = defineEmits(["search", "reset"]);
defineProps({
	// 抽屉展示的位置
	placement: {
		type: String,
		required: true,
		default: () => {
			return "top";
		}
	},
	// 抽屉的宽度（只在placement为left、right时生效）
	width: {
		type: Number,
		required: false,
		default: () => {
			return 200;
		}
	},

	// 抽屉出现的区域
	to: {
		type: String,
		required: true,
		default: () => {
			return "top";
		}
	},
	size: {
		type: Number,
		required: false,
		default: () => {
			return 17;
		}
	}
});

// 展开搜索框体
const handleActive = () => {
	active.value = true;
};

const search = () => {
	emits("search");
	active.value = false;
};
const reset = () => {
	emits("reset");
};
</script>

<style lang="scss" scoped>
.n-icon {
	display: inline-block;
	height: 1em;
	width: 1em;
	line-height: 1em;
	text-align: center;
	position: relative;
	fill: currentColor;
	transform: translateZ(0);
}
</style>
