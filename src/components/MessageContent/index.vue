<template>
	<slot></slot>
</template>
<script>
import { useMessage } from "naive-ui";

export default {
	name: "MessageContent",
	setup() {
		// 挂载在 window 方便与在js中使用
		// @ts-ignore
		window.$message = useMessage();
	}
};
</script>
