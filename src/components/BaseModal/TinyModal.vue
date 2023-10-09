<template>
	<TinyLayer
		v-model="visible"
		draggable
		:id="modalId"
		:title="title"
		:esc-closable="closeOnEsc"
		:close-icon-visible="true"
		:width="style.width"
		:footer-visible="!!footer"
		@after-open="afterEnter"
		@after-close="afterLeave"
		@cancel="handleClose"
		:fullscreen="fullscreen"
		:fullscreen-icon-visible="!fullscreen"
	>
		<div style="overflow: auto; width: 100%" :style="style.height ? { height: style.height } : {}">
			<slot></slot>
		</div>
		<template #footer v-if="footer">
			<div style="width: 100%; text-align: right">
				<slot name="footer"></slot>
			</div>
			<div style="width: 100%; text-align: right" v-if="!slotFooter">
				<n-button type="tertiary" @click="handleClose"> 取 消 </n-button>
				<n-button type="primary" style="margin-left: 15px" @click="handleOk"> {{ subBtuText }} </n-button>
			</div>
		</template>
	</TinyLayer>
</template>

<script setup>
defineOptions({ name: "BaseModal" });

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
		default: true
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
	},
	closeOnEsc: {
		type: Boolean,
		default: true
	}
});
const slotFooter = !!useSlots().footer;
function generateRandomString(length) {
	let result = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

const modalId = generateRandomString(16);

const visible = computed({
	get() {
		return props.show;
	},
	set(val) {
		emits("update:show", val);
	}
});

const handleClose = () => {
	emits("update:show", false);
	emits("close");
};

const handleOk = () => {
	emits("ok");
};

/**
 * Modal 出现后的回调
 */
const afterEnter = () => {
	emits("after-enter");
};

/**
 * Modal 关闭后的回调
 */
const afterLeave = () => {
	emits("update:show", false);
	emits("close");
	emits("after-leave");
};
</script>

<style lang="less">
.cursor-move {
	cursor: move;
}
</style>
