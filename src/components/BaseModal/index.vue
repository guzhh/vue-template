<template>
	<n-modal
		v-model:show="visible"
		class="custom-card"
		preset="card"
		size="small"
		:mask-closable="false"
		:bordered="false"
		closable
		id="basic-modal"
		@after-enter="afterEnter"
		@after-leave="afterLeave"
		@close="handleClose"
		:segmented="{ content: 'soft', footer: 'soft' }"
		:content-style="{ minHeight: 0 }"
		:style="ifFullscreen ? { width: '100vw', height: '100vh' } : style"
	>
		<template #header>
			<div class="w-full cursor-move" id="basic-modal-bar">
				{{ title }}
				<slot name="header"></slot>
			</div>
		</template>
		<template #header-extra v-if="!fullscreen">
			<n-button text @click="toggleFullScreen" style="margin-right: 20px">
				<template #icon>
					<n-icon>
						<full-screen-minimize24-regular v-if="ifFullscreen" />
						<full-screen-maximize24-regular v-else />
					</n-icon>
				</template>
			</n-button>
		</template>
		<div style="width: 100%; height: 100%; overflow: auto">
			<slot></slot>
		</div>
		<template #footer v-if="footer">
			<div style="text-align: right; width: 100%">
				<slot name="footer"></slot>
			</div>
			<div style="text-align: right; width: 100%" v-if="!slotFooter">
				<n-button type="tertiary" @click="handleClose"> 取 消 </n-button>
				<n-button type="primary" style="margin-left: 15px" @click="handleOk"> {{ subBtuText }} </n-button>
			</div>
		</template>
	</n-modal>
</template>

<script setup>
import startDrag from "@/utils/drag";

defineOptions({ name: "BaseModal" });

const slotFooter = !!useSlots().footer;
const emits = defineEmits(["close", "update:show", "ok", "after-enter", "after-leave"]);

const props = defineProps({
	show: {
		type: Boolean,
		required: true
	},
	/**
	 * 是否显示底部按钮
	 */
	footer: {
		type: Boolean,
		required: true
	},
	title: {
		title: String,
		default: " "
	},
	subBtuText: {
		title: String,
		default: "确定"
	},
	fullscreen: {
		type: Boolean,
		default: false
	},
	style: {
		type: Object,
		default: () => {
			return { width: "600px", height: "400px" };
		}
	}
});

const visible = computed({
	get() {
		return props.show;
	},
	set(val) {
		emits("update:show", val);
	}
});

const ifFullscreen = ref(props.fullscreen);

const handleClose = () => {
	emits("update:show", false);
	emits("close");
};

const toggleFullScreen = () => {
	ifFullscreen.value = !ifFullscreen.value;
	if (ifFullscreen.value) {
		document.getElementById("basic-modal").style.top = 0;
		document.getElementById("basic-modal").style.left = 0;
	}
	nextTick(() => {
		const oBox = document.getElementById("basic-modal");
		const oBar = document.getElementById("basic-modal-bar");
		startDrag(oBar, oBox);
	});
};

const handleOk = () => {
	emits("ok");
};

/**
 * Modal 出现后的回调
 */
const afterEnter = () => {
	emits("after-enter");
	nextTick(() => {
		const oBox = document.getElementById("basic-modal");
		const oBar = document.getElementById("basic-modal-bar");
		startDrag(oBar, oBox);
	});
};

/**
 * Modal 关闭后的回调
 */
const afterLeave = () => {
	emits("after-leave");
};
</script>

<style lang="less">
.cursor-move {
	cursor: move;
}
</style>
