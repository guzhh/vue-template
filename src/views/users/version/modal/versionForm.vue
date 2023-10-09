<!--
  文件描述：
  创建时间：2023/10/4 18:08
  创建人：gzh
-->
<template>
	<base-modal style="width: 1200px" title="新增版本" v-model:show="visible" @ok="handleOk" fullscreen @close="handleClose">
		<n-form
			ref="formRef"
			:model="formValue"
			:rules="rules"
			label-placement="left"
			label-width="100px"
			require-mark-placement="left"
			style="padding: 15px 10px 30px 10px"
		>
			<n-form-item label="版本号" path="versionNo">
				<n-input v-model:value="formValue.versionNo" placeholder="请输入版本号" />
			</n-form-item>
			<n-form-item label="更新内容" path="htmlVal">
				<div style="width: 100%; background-color: red">
					<wang-editor v-model:value="formValue.htmlVal" :height="height - 170" />
				</div>
			</n-form-item>
		</n-form>
	</base-modal>
</template>

<script setup>
import { useWindowSize } from "@/hooks/useWindowSize";

defineOptions({ name: "VersionForm" });

const { height } = useWindowSize();
const visible = ref(false);
const formValue = { htmlVal: "<p></p>", versionNo: null };
const rules = {};

const handleClose = () => {
	visible.value = false;
};

const handleOk = () => {};

const show = () => {
	visible.value = true;
};

defineExpose({ show });
</script>

<style scoped></style>
