<template>
	<slot></slot>
</template>
<script>
import { useDialog } from "naive-ui";

export default {
	name: "DialogContent",
	setup() {
		// 挂载在 window 方便与在js中使用
		// @ts-ignore
		window.$dialog = useDialog();
	}
};
</script>
