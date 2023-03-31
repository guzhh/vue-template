<template>
	<div ref="aceRef" style="width: 100%; min-height: 350px"></div>
</template>

<script setup>
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-github";

const emits = defineEmits(["update:value"]);
const props = defineProps({
	/**
	 * 绑定值
	 */
	value: {
		type: String,
		default: ""
	},

	/**
	 * 语言
	 */
	language: {
		type: String,
		default: "javascript"
	},

	/**
	 * 主题
	 */
	theme: {
		type: String,
		default: "tomorrow"
	},

	/**
	 * 是否只读
	 */
	readonly: {
		type: Boolean,
		default: false
	}
});

const aceRef = ref();
const codeEditor = ref();

onMounted(() => {
	try {
		codeEditor.value = ace.edit(aceRef.value, {
			mode: `ace/mode/${props.language}`,
			theme: `ace/theme/${props.theme}`,
			value: props.value,
			readOnly: props.readonly,
			fontSize: 14,
			tabSize: 2
		});
	} catch (e) {
		console.log("--------------");
	}

	// 监听代码编辑器输入
	codeEditor.value.on("change", () => emits("update:value", codeEditor?.getValue()));
});

watch(
	() => props.value,
	value => {
		if (codeEditor.value) {
			const currentPosition = codeEditor.value?.selection.getCursor();
			codeEditor.value.getValue(value);
			codeEditor.value.clearSelection();
			codeEditor.value.gotoLine(currentPosition.row + 1, currentPosition.column, true);
		}
	}
);
</script>

<style scoped></style>
