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
		<!--		<template #header>-->
		<!--			<div class="w-full cursor-move" id="basic-modal-bar">-->
		<!--				{{ title }}-->
		<!--				<slot name="header"></slot>-->
		<!--			</div>-->
		<!--		</template>-->
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
	<!--	<n-modal-->
	<!--		v-model:show="visible"-->
	<!--		class="custom-card"-->
	<!--		preset="card"-->
	<!--		size="small"-->
	<!--		:mask-closable="false"-->
	<!--		:bordered="false"-->
	<!--		closable-->
	<!--		id="basic-modal"-->
	<!--		@after-enter="afterEnter"-->
	<!--		@after-leave="afterLeave"-->
	<!--		@close="handleClose"-->
	<!--		@esc="handleClose"-->
	<!--		:segmented="{ content: 'soft', footer: 'soft' }"-->
	<!--		:content-style="{ minHeight: 0 }"-->
	<!--		:style="ifFullscreen ? { width: '100vw', height: '100vh' } : style"-->
	<!--	>-->
	<!--		<template #header>-->
	<!--			<div class="w-full cursor-move" id="basic-modal-bar">-->
	<!--				{{ title }}-->
	<!--				<slot name="header"></slot>-->
	<!--			</div>-->
	<!--		</template>-->
	<!--		<template #header-extra v-if="!fullscreen">-->
	<!--			<n-button text @click="toggleFullScreen" style="margin-right: 20px">-->
	<!--				<template #icon>-->
	<!--					<n-icon>-->
	<!--						<full-screen-minimize24-regular v-if="ifFullscreen" />-->
	<!--						<full-screen-maximize24-regular v-else />-->
	<!--					</n-icon>-->
	<!--				</template>-->
	<!--			</n-button>-->
	<!--		</template>-->
	<!--		<div style="width: 100%; height: 100%; overflow: auto">-->
	<!--			<slot></slot>-->
	<!--		</div>-->
	<!--		<template #footer v-if="footer">-->
	<!--			<div style="width: 100%; text-align: right">-->
	<!--				<slot name="footer"></slot>-->
	<!--			</div>-->
	<!--			<div style="width: 100%; text-align: right" v-if="!slotFooter">-->
	<!--				<n-button type="tertiary" @click="handleClose"> 取 消 </n-button>-->
	<!--				<n-button type="primary" style="margin-left: 15px" @click="handleOk"> {{ subBtuText }} </n-button>-->
	<!--			</div>-->
	<!--		</template>-->
	<!--	</n-modal>-->
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
