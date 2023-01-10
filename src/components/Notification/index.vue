<template>
	<slot></slot>
</template>
<script>
import { useNotification } from "naive-ui";

export default {
	name: "Notification",
	setup() {
		// 挂载在 window 方便与在js中使用
		// @ts-ignore
		window.$notification = useNotification();
	}
};
</script>
