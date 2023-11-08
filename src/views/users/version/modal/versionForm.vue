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
			<n-form-item label="版本号" path="versionCode">
				<n-input v-model:value="formValue.versionCode" placeholder="请输入版本号" />
			</n-form-item>
			<n-form-item label="版本名称" path="versionName">
				<n-input v-model:value="formValue.versionName" placeholder="请输入版本号" />
			</n-form-item>
			<n-form-item label="发布时间" path="releaseDate">
				<n-date-picker
					style="width: 100%"
					v-model:formatted-value="formValue.releaseDate"
					format="yyyy-MM-dd HH:mm:ss"
					type="datetime"
					clearable
				/>
			</n-form-item>
			<n-form-item label="更新内容" path="releaseNotes">
				<div style="width: 100%">
					<wang-editor v-model:value="formValue.releaseNotes" :height="height - 170" />
				</div>
			</n-form-item>
		</n-form>
	</base-modal>
</template>

<script setup>
import { useWindowSize } from "@/hooks/useWindowSize";
import { saveOrUpt } from "@/api/users/version";

defineOptions({ name: "VersionForm" });

const emits = defineEmits(["ok"]);
const message = useMessage();
const formRef = ref();
const { height } = useWindowSize();
const visible = ref(false);
const defaultValue = { releaseNotes: "<p></p>", versionCode: null, releaseDate: null, releaseStatus: 1, versionName: null };
const formValue = ref({ ...defaultValue });
const rules = {
	releaseNotes: { required: true, message: "请输入版本更新描述", trigger: "blur" },
	versionName: { required: true, message: "请输入版本名称", trigger: "blur" },
	versionCode: { required: true, message: "请输入版本号", trigger: "blur" },
	releaseDate: { required: true, message: "请选择发布日期", trigger: "blur" }
};

const handleClose = () => {
	visible.value = false;
	formValue.value = { ...defaultValue };
};

const handleOk = () => {
	formRef.value?.validate(errors => {
		if (!errors) {
			if (formValue.value.releaseNotes === defaultValue.releaseNotes) {
				message.warning("请输入版本更新描述");
			} else {
				saveOrUpt({ ...formValue.value }).then(res => {
					if (res.success) {
						emits("ok");
						handleClose();
					}
				});
			}
		}
	});
};

const show = () => {
	visible.value = true;
};

const edit = row => {
	formValue.value = { ...row };
	visible.value = true;
};

defineExpose({ show, edit });
</script>

<style scoped></style>
